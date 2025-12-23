import React, { useState } from "react";
import axios from "axios";

export default function TopProducts() {
  const [season, setSeason] = useState("");
  const [units, setUnits] = useState("");
  const [products, setProducts] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/topProducts/${season}/${units}`)
      .then((res) => setProducts(res.data))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Top 10 Products</h3>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Units Sold Greater Than"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Get Products</button>
      </form>

      <br />

      {products.length > 0 && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
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
