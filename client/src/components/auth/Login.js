import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFromData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChangeLogin = e =>
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const SubmitFrom = async e => {
    e.preventDefault();
    console.log("success");
  };
  return (
    <Fragment>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Sign Into Your Account
            </p>
            <form className="form" onSubmit={e => SubmitFrom(e)}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={e => onChangeLogin(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={e => onChangeLogin(e)}
                />
              </div>
              <input type="submit" class="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
