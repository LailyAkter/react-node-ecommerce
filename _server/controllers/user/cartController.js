const Cart = require("../../models/user/Cart");
const Product = require("../../models/user/Product");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
module.exports = function(app, prefix) {
  // crate cart
  app.post(prefix + "/add", async (req, res) => {
    try {
      const { qn } = req.body;
      const productId = mongoose.Types.ObjectId(req.body.productId);

      const cart = new Cart({
        quantity: qn,
        item: productId
      });
      await cart.save((err, cart) => {
        if (err) {
          return res.status(422).json({
            error: "Your request could not be processed. Please try again."
          });
        }
        res.status(200).json({
          success: true,
          message: `Cart has been added successfully!`,
          cart: cart
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  });
  app.get(prefix + "/all", async (req, res) => {
    // get all chart

    let productIds = [];
    let cartData = await Cart.find();
    cartData.forEach(d => {
      productIds.push(mongoose.Types.ObjectId(d._id));
    });
    console.log(productIds);

    const Products = await Product.where({ _id: { $in: productIds } });

    res.status(200).json({
      success: true,
      message: `Item has been removed from your shopping cart!`,
      cart: Products
    });
  });

  app.delete(prefix + "/delete/:id", async (req, res) => {
    try {
      Cart.findByIdAndRemove({}, (err, data) => {
        if (err) {
          return res.status(422).json({
            error: "Your request could not be processed. Please try again."
          });
        }

        res.status(200).json({
          success: true,
          message: `Item has been removed from your shopping cart!`,
          cart: data
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(400).send("server error");
    }
  });
};
