import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// // redux
// import { Provider } from "react-redux";
// import store from "../store";

// components
import AdminProduct from "./components/AdminProduct/AdminProduct";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  componentDidMount() {}
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route path="admin/products" exact component={AdminProduct} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
export default Admin;