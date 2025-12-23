import React, { useState } from "react";
import axios from "axios";

export default function SeasonTotals() {
  const [season, setSeason] = useState("");
  const [result, setResult] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/seasonTotals/${season}`)
      .then((res) => setResult(res.data))
      .catch((err) => alert(err.response.data.error));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Season Totals</h3>

      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter Season (e.g. Winter)"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Get Totals</button>
      </form>

      <br />

      {result && result.length > 0 && (
        <div>
          <h4>Results for {season}</h4>
          <p>Total Units Sold: {result[0].totalUnitsSold}</p>
          <p>Total Returns: {result[0].totalReturns}</p>
          <p>Total Revenue: {result[0].totalRevenue}</p>
        </div>
      )}
    </div>
  );
}
