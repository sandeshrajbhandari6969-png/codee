import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import SeasonTotals from "./components/SeasonTotals";
import TopProducts from "./components/TopProducts";
import RatingFilter from "./components/RatingFilter";

function App() {
  return (
    <Router>
      <div className="navbar">
        <div className="logo">👗 Fashion Shop </div>
        <ul>
          <li><Link to="/add">Add</Link></li>
          <li><Link to="/update">Update</Link></li>
          <li><Link to="/delete">Delete</Link></li>
          <li><Link to="/seasonTotals">Totals</Link></li>
          <li><Link to="/topProducts">Top 10</Link></li>
          <li><Link to="/ratingFilter">Avg Rating</Link></li>
        </ul>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/delete" element={<DeleteProduct />} />
          <Route path="/seasonTotals" element={<SeasonTotals />} />
          <Route path="/topProducts" element={<TopProducts />} />
          <Route path="/ratingFilter" element={<RatingFilter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
