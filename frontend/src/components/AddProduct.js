import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [state, setState] = useState({
    productCategory: "",
    productName: "",
    unitsSold: "",
    returns: "",
    revenue: "",
    customerRating: "",
    stockLevel: "",
    season: "",
    trendScore: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/addProduct", state)
      .then(() => alert("Product added successfully"))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Add Product</h3>

      <form onSubmit={onSubmit}>
        <input name="productCategory" placeholder="Product Category" onChange={handleChange} />
        <br /><br />

        <input name="productName" placeholder="Product Name" onChange={handleChange} />
        <br /><br />

        <input name="unitsSold" type="number" placeholder="Units Sold" onChange={handleChange} />
        <br /><br />

        <input name="returns" type="number" placeholder="Returns" onChange={handleChange} />
        <br /><br />

        <input name="revenue" type="number" placeholder="Revenue" onChange={handleChange} />
        <br /><br />

        <input name="customerRating" type="number" step="0.1" placeholder="Customer Rating" onChange={handleChange} />
        <br /><br />

        <input name="stockLevel" type="number" placeholder="Stock Level" onChange={handleChange} />
        <br /><br />

        <input name="season" placeholder="Season" onChange={handleChange} />
        <br /><br />

        <input name="trendScore" type="number" placeholder="Trend Score" onChange={handleChange} />
        <br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
