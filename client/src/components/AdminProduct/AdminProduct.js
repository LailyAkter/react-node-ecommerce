import React from "react";
import $ from "jquery";

class AdminProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[]
    };
    this._allProduct = this._allProduct.bind(this);
  }

  _allProduct() {
      $.ajax({
          type:"GET",
          url:'http://localhost:3005/product',
          success:function(data){
            console.log(data);
            
          }
      })
  }
  componentWillMount() {}
  componentDidMount() {
    this._allProduct();
  }
  render() {
    return <div></div>;
  }
}

export default AdminProduct;
