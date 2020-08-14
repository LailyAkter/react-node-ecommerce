const Tag = require('../../models/user/Tag');
const {check,validationResult} = require('express-validator');
module.exports = function (app,prefix){ 
    // add tag  
    app.post(prefix+'/add',
    [
        check('name','Name is required!')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        try {
            const {name} = req.body;
            const slug = req.body.name.replace(/ /g, '-') +'-'+ Date.now();
            const tag = new Tag({
                name,slug
            });
            await tag.save((err, tag) => {
                if (err) {
                return res.status(422).json({
                    error: 'Your request could not be processed. Please try again.'
                });
                }
        
                res.status(200).json({
                success: true,
                message: `Tag has been added successfully!`,
                tag: tag
                });
            });

        } catch (err) {
            console.error(err.message);
            return res.status(400).send('server error');
        }  
    });
  
    // fetch all tag api
    app.get(prefix+'/list',async (req, res) => {
      try {
        await Tag.find({}, (err, data) => {
            if (err) {
              return res.status(422).json({
                error: 'Your request could not be processed. Please try again.'
              });
            }
            res.status(200).json({
              tag: data
            });
          });
      } catch (err) {
          console.error(err.message);
          return res.status(400).send('server error');
      }
    });
  
    // update tag
    app.post(prefix+'/update/:id',
    [
        check('name','Name is required!')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        try {
            const slug = req.body.name.replace(/ /g, '-') +'-'+ Date.now();
            const tag = {
                name:req.body.name,
                slug:slug
            }
            await Tag.findByIdAndUpdate(req.params.id,tag,(err,data)=>{
                if(err) throw err;
                return res.status(200).json({
                    success: true,
                    message: `Tag has been updated successfully!`,
                    tag: data
                })
            })
        } catch (err) {
            console.error(err.message);
            res.status(400).send('server error');
        }
    });
    
    // delete tag
    app.post(prefix+'/delete/:id',async (req, res) => {
      try {
        await Tag.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
            if (err) throw err;  
            res.status(200).json({
              success: true,
              message: `Tag has been deleted successfully!`,
              tag: data
            });
          });
      } catch (err) {
          console.error(err.message);
          res.status(400).send('server error');       
      }
    });
}