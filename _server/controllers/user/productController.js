const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Product = require("../../models/user/Product");
const Category = require("../../models/user/Category");
const Brand = require("../../models/user/Brand");
const User = require("../../models/user/User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

module.exports = function(app, prefix) {
  // add and update product
  app.post(
    prefix + "/add",
    [
      check("name", "You must enter a name.")
        .not()
        .isEmpty(),
      check("quantity", "You must enter a quantity")
        .not()
        .isEmpty(),
      check("price", "You must enter a price.")
        .not()
        .isEmpty(),
      check("sku", "You must enter a sku.")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        name,
        sku,
        description,
        quantity,
        offer,
        price,
        shipping,
        available,
        stock,
        keyword,
        PID
      } = req.body;
      let { category } = req.body;
      let { brand } = req.body;
      const slug = req.body.name.replace(/ /g, "-") + "-" + Date.now();

      // Build Product object
      const productFields = {};
      productFields.category = mongoose.Types.ObjectId(category);
      productFields.brand = mongoose.Types.ObjectId(brand);
      if (name) productFields.name = name;
      if (sku) productFields.sku = sku;
      if (description) productFields.description = description;
      if (quantity) productFields.quantity = quantity;
      if (offer) productFields.offer = offer;
      if (price) productFields.price = price;
      if (shipping) productFields.shipping = shipping;
      if (available) productFields.available = available;
      if (stock) productFields.stock = stock;
      if (keyword) productFields.keyword = keyword;
      if (slug) productFields.slug = slug;

      if (PID) {
        // let product = await Product.findOne({ _id: PID });
        //console.log(product);
        // Update
        product = await Product.findOneAndUpdate(
          { _id: PID },
          { $set: productFields },
          { new: true }
        );
        res.json(product);
      } else {
        // Create
        let product = new Product(productFields);
        await product.save();
        res.json(product);
      }
    }
  );

  //all product
  app.get(prefix + "/", async (req, res) => {
    try {
      const product = await Product.find()
        .populate("category", ["name"])
        .populate("brand", ["name"]);
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // findbyid
  app.get(prefix + "/:id", async (req, res) => {
    let product = await Product.findById(req.params.id)
      .populate("category", ["name"])
      .populate("brand", ["name"]);
    res.json(product);
  });

  // delete product
  app.post(prefix + "/delete/:id", async (req, res) => {
    try {
      let products = await Product.findByIdAndRemove(
        req.params.id,
        (err, data) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            message: `Product has been delete successfully!`,
            product: data
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(400).send("server error");
    }
  });
};
