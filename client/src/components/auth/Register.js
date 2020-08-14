import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

import "../../App.css";

const Register = ({ setAlert }) => {
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChangeRegister = e =>
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const SubmitFrom = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not Match", "danger");
    } else {
      console.log("success");
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={e => SubmitFrom(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={e => onChangeRegister(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={e => onChangeRegister(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={e => onChangeRegister(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                  name="password2"
                  value={password2}
                  onChange={e => onChangeRegister(e)}
                />
              </div>
              <input type="submit" class="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};
export default connect(null, { setAlert })(Register);
