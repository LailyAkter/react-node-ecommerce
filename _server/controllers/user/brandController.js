const Brand = require('../../models/user/Brand');
const {check,validationResult} = require('express-validator');
module.exports = function (app,prefix){ 
    // add brand  
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
            const brand = new Brand({
                name,slug
            });
            await brand.save((err, brand) => {
                if (err) {
                return res.status(422).json({
                    error: 'Your request could not be processed. Please try again.'
                });
                }
        
                res.status(200).json({
                success: true,
                message: `Brand has been added successfully!`,
                brand: brand
                });
            });

        } catch (err) {
            console.error(err.message);
            return res.status(400).send('server error');
        }  
    });
  
    // fetch all brands api
    app.get(prefix+'/list',async (req, res) => {
      try {
        await Brand.find({}, (err, data) => {
            if (err) {
              return res.status(422).json({
                error: 'Your request could not be processed. Please try again.'
              });
            }
            res.status(200).json({
              brands: data
            });
          });
      } catch (err) {
          console.error(err.message);
          return res.status(400).send('server error');
      }
    });
  
    // update brand
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
            const brand = {
                name:req.body.name,
                slug:slug
            }
            await Brand.findByIdAndUpdate(req.params.id,brand,(err,data)=>{
                if(err) throw err;
                return res.status(200).json({
                    success: true,
                    message: `Brand has been updated successfully!`,
                    brand: data
                })
            })
        } catch (err) {
            console.error(err.message);
            res.status(400).send('server error');
        }
    });
    
    // delete brand
    app.post(prefix+'/delete/:id',async (req, res) => {
      try {
        await Brand.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
              return res.status(422).json({
                error: 'Your request could not be processed. Please try again.'
              });
            }
      
            res.status(200).json({
              success: true,
              message: `Brand has been deleted successfully!`,
              brand: data
            });
          });
      } catch (err) {
          console.error(err.message);
          res.status(400).send('server error');       
      }
    });
}