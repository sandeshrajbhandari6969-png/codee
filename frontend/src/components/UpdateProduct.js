import React, { useState } from "react";
import axios from "axios";

export default function UpdateProduct() {
  const [productName, setProductName] = useState("");

  const [state, setState] = useState({
    productCategory: "",
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
      .post(`http://localhost:5000/updateProduct/${productName}`, state)
      .then(() => alert("Product updated successfully"))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Update Product</h3>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Product Name (to update)"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br /><br />

        <input
          name="productCategory"
          placeholder="Product Category"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="unitsSold"
          type="number"
          placeholder="Units Sold"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="returns"
          type="number"
          placeholder="Returns"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="revenue"
          type="number"
          placeholder="Revenue"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="customerRating"
          type="number"
          step="0.1"
          placeholder="Customer Rating"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="stockLevel"
          type="number"
          placeholder="Stock Level"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="season"
          placeholder="Season"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="trendScore"
          type="number"
          placeholder="Trend Score"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
