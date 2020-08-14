const Category = require('../../models/user/Category');
const {check,validationResult} = require('express-validator');

module.exports = function(app,prefix){
    // crate category
    app.post(prefix+'/add',
    [
        check('name','Name is Required')
        .not()
        .isEmpty()
    ],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors:errors.array()})
        };
      
        try {
            let {name,description} = req.body;
            const slug = req.body.name.replace(/ /g, '-') +'-'+ Date.now();
            let category = new Category({
                name,description,slug
            });
            await category.save((err, category) => {
                if (err) {
                  return res.status(422).json({
                    error: 'Your request could not be processed. Please try again.'
                  });
                }
          
                res.status(200).json({
                  success: true,
                  message: `Category has been added successfully!`,
                  category: category
                });
            });
            
        } catch (err) {
            console.error(err.message);
            return res.status(400).json('server error')
        }
    });

    // update categories
    app.post(prefix+'/update/:id',async(req,res)=>{
        try {
            let catData = {name,description} = req.body;
            const slug = req.body.name.replace(/ /g, '-') +'-'+ Date.now();
            let category = new Category({
                name,description,slug
            });
            await Category.findByIdAndUpdate(req.params.id,catData,(err,data)=>{
                if(err) throw err;
                return res.status(200).json({
                    success:true,
                    message:`Category has been deleted successfully`,
                    category:data
                })
            })
        } catch (err) {
            console.error(err.message);
            return res.status(400).json({
                msg:'server error'
            });
        }
    })
    // fetch all categories
    app.get(prefix+'/list',async(req,res)=>{
      
        await Category.find({},(err,data)=>{
            if(err) throw err;
            return res.status(200).json({
                categories: data
            });
        });
    });

    // delete categories
    app.post(prefix+'/delete/:id',async(req,res)=>{
        await Category.findByIdAndRemove({_id:req.params.id},(err,data)=>{
            if(err) throw err;
            return res.status(200).json({
                success:true,
                message:'Category has been delete successfully',
                category:data
            })
        })
    });

    // particular category
    // app.get(prefix+'/:id',async(req,res)=>{
    //     try {
    //         await Product.findOne({ _id: req.params.id}).
    //         populate({
    //             path : 'product',
    //             populate : { path : 'product'}
    //         }).
    //         exec(function (err, data) {
    //             if(err) throw err;
    //             return res.status(200).json({
    //                 success:true,
    //                 category:data
    //             })
    //         });
    //     } catch (err) {
    //         console.error(err.message);
    //         return res.status(400).send('server error');
    //     }
    // }); 

    app.get(prefix+'/:category_id', async (req, res) => {
        try {
        const product = await Product.find({ category: req.params.category_id }).populate(
            'category',
            ['name']
        );
    
        if (!product) {
            return res.status(400).json({ msg: 'There is no category for this product' });
        }
    
        res.json(product);
        } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
        }
    });
}