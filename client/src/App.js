import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import store from "./store";

// components
import Product from "./components/Products/Product";
import ProductDetails from "./components/Products/ProductDetails";
import Navbar from "./components/Layouts/Navbar";
import Landing from "./components/Layouts/Landing";
import Alert from "./components/Layouts/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// admin
import Admin from "./Admin";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/products" exact component={Product} />
              <Route path="/products/:id" exact component={ProductDetails} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};
export default App;
