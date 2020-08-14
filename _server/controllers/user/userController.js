const User = require("../../models/user/User");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

module.exports = function(app, prefix) {
  // register controller
  app.post(
    prefix + "/register",
    [
      check("email", "Please Enter a valid Email").isEmail(),
      check("password", "Password must be 8 characters").isLength({ min: 8 })
    ],
    async (req, res) => {
      const errrors = validationResult(req);
      if (!errrors.isEmpty()) {
        return res.status(400).json({ errors: errrors.array() });
      }

      let { name, email, password, phone } = req.body;
      try {
        let user = await User.findOne({ email });
        if (user) {
          res.status(400).send("Email Already Exists");
        }

        user = new User({
          name,
          email,
          password,
          phone
        });

        // bcrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // return jsonwebtoken
        const payload = {
          user: {
            id: user.id
          }
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        return res.status(400).send("server error");
      }
    }
  );

  // login controller
  app.post(
    prefix + "/login",
    [
      check("email", "Please Enter a valid Email").isEmail(),
      check("password", "Password Must be 8 Characters").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      let { email, password } = req.body;

      try {
        let user = await User.findOne({ email });
        if (!user) {
          res.status(400).send("Invalid Credentials");
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(400).json("Password does not Match");
        }

        // return jsonwebtoken
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000
          },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        return res.status(400).send("server errror");
      }
    }
  );
};
