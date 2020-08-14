module.exports = function(app) {
  require("../../controllers/user/userController")(app, "/user");
  require("../../controllers/user/categoryController")(app, "/category");
  require("../../controllers/user/productController")(app, "/product");
  require("../../controllers/user/brandController")(app, "/brand");
  require("../../controllers/user/tagController")(app, "/tag");
  require("../../controllers/user/cartController")(app, "/cart");
  require("../../controllers/user/testController")(app, "/test");
};
