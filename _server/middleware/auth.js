const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    // get token from header
    const token = req.header('x-auth-token');
    // check if not token
    if(!token){
        return res.status(401).send('No Token,Authorization denid')
    }

    // verify token
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.admin = decoded.admin;
        next();
    }catch(err){
        res.status(401).json('Token is not valid')
    }
}