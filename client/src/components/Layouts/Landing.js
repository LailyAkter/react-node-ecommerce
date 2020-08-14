import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import Product from "../Products/Product";

const Landing = () => {
  return (
    <section>
      <section className="banner_part">
        <div className="container">
          <div className="banner_content"></div>
        </div>
      </section>

      <Product/>
    </section>
  );
};

export default Landing;
