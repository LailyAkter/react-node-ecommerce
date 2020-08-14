import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import '../../App.js';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getallProduct = this.getallProduct.bind(this);
    this._addToCart = this._addToCart.bind(this);
  }

  componentWillMount() {}
  componentDidMount() {
    this.getallProduct();
  }
  _addToCart(qn, productId) {
    var self = this;
    $.ajax({
      type: "POST",
      url: "http://localhost:3005/cart/add",
      success: function(data) {
        console.log(data);
      }
    });
  }
  getallProduct() {
    var self = this;
    $.ajax({
      type: "GET",
      url: "http://localhost:3005/product",
      success: function(data) {
        self.setState({
          products: data
        });
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <div className="left_sidebar">
              {/* categories */}
              <h3>Categories</h3>
              <ul className="list-group">
                {this.state.products.map((product, index) => {
                  return (
                    <div>
                      <li className="list-group-item">
                        {product.category.name}
                      </li>
                    </div>
                  );
                })}
              </ul>

              {/* brands */}
              <h3>Brands</h3>
              <ul className="list-group">
                {this.state.products.map((product, index) => {
                  return (
                    <div>
                      <li className="list-group-item">{product.brand.name}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row">
              {this.state.products.map((product, index) => {
                return (
                  <div className="col-md-4 mb-4 ">
                    <div className="card">
                      <Link to={"/products/" + product._id} target="_blank">
                        <img src="https://cdn.pixabay.com/photo/2014/04/02/14/03/wedding-306000_960_720.png" />
                      </Link>

                      <div className="card-body text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <h4>${product.price}</h4>
                        <button
                          onClick={this._addToCart()}
                          className="btn btn-success"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
