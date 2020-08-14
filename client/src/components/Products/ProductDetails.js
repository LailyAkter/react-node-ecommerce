import React from 'react';
import $ from 'jquery';

class ProductDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            products:null
        }
        this._getProductByID=this._getProductByID.bind(this);
    }
    componentDidMount(){
        const productId=this.props.match.params.id;
        this._getProductByID(productId);
    }

    _getProductByID(id){
        var self = this;
        $.ajax({
            type:'GET',
            url:'http://localhost:3005/product/'+id,
            success:function(data){
                console.log(data);
                self.setState({
                    products:data
                })    
            }
        })
    }

    render(){
        const {products}=this.state;
        return(
            <div className='container'>
               {products&& (<div className='row'>
                    <div className='col-md-6'>
                        <div className='details'>
                            <img src='https://cdn.pixabay.com/photo/2014/04/02/14/03/wedding-306000_960_720.png'/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='details_content'>
                            <div>
                                <h2>{products.name}</h2>
                                <h5>${products.price}</h5>
                                <p>{products.description}</p>
                                <p> 
                                    <span>
                                    Product Code:
                                    <span>{products.sku}</span>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Category:
                                        <span>{products.category.name}</span>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        Tags:
                                        <span>fdfffg</span>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                    Quantity:
                                        <span>{products.quantity}</span>
                                    </span>
                                </p>
                                <p>
                                    Available:
                                    <span>{products.available}</span>
                                </p>
                                <button className='btn btn-success'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
               )}
            </div>
        )
    }
}

export default ProductDetails;