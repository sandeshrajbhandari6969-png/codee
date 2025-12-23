import React, { useState } from "react";
import axios from "axios";

export default function RatingFilter() {
  const [season, setSeason] = useState("");
  const [rating, setRating] = useState("");
  const [products, setProducts] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/ratingFilter/${season}/${rating}`)
      .then((res) => setProducts(res.data))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Customer Rating Filter</h3>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Season (e.g. Autumn)"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          step="0.1"
          placeholder="Minimum Customer Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Filter Products</button>
      </form>

      <br />

      {products.length > 0 && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Customer Rating</th>
              <th>Units Sold</th>
              <th>Revenue</th>
              <th>Season</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.productName}</td>
                <td>{p.productCategory}</td>
                <td>{p.customerRating}</td>
                <td>{p.unitsSold}</td>
                <td>{p.revenue}</td>
                <td>{p.season}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
