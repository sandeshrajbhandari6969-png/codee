import React, { useState } from "react";
import axios from "axios";

export default function DeleteProduct() {
  const [productName, setProductName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/deleteProduct/${productName}`)
      .then(() => alert("Product deleted successfully"))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Delete Product</h3>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
}
