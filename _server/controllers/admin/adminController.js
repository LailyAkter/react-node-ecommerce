const Admin = require('../../models/admin/Admin');
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(app,prefix){
  // register controller
  app.post(prefix+'/signup',[
    check('email','Please Include a Valid Email')
    .isEmail(),
    check('password','Please enter a password with 6 or more characters')
    .isLength({min:8})
  ],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    let {name,email,password,phone} = req.body;

    try{
      let admin = await Admin.findOne({email});
      if(admin){
        res.status(400).json('Email Already Exists');
      }

      admin = new Admin({
        name,email,password,phone
      });

      // bcrypt password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password,salt);
      await admin.save();

      // return jsonwebtoken
      const payload = {
        admin:{
          id:admin.id
        }
      };
      jwt.sign(payload,config.get('jwtSecret'),
      {
        expiresIn:360000
      },
      (err,token)=>{
        if(err) throw err;
        res.json({token});
      }
    );
    }catch(err){
      console.error(err.message);
      res.status(400).send('server error')
    }
  });

  // sign in controller
  app.post(prefix+'/signin',[
    check('email','Please Include a Valid Email')
    .isEmail(),
    check('password','Please enter a password with 6 or more characters')
    .exists()
  ],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    };

    let {email,password} = req.body;
    try{
      let admin = await Admin.findOne({email});
      if(!admin){
        res.status(400).json('Invalid Credentials');
      }
     // compare password
     const isMatch = await bcrypt.compare(password,admin.password);
     if(!isMatch){
       res.status(400).json('Password does not Match');
     }
     // return jsonwebtoken
     const payload = {
       admin:{
         id:admin.id
       }
     };
     jwt.sign(payload,config.get('jwtSecret'),
     {
       expiresIn:360000
     },
     (err,token)=>{
       if(err) throw err;
       res.json({token});
     }
    );
    }catch(err){
      console.error(err.message);
      res.status(400).json('server error')
    }
  });
}
