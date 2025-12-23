const express = require("express");
const cors = require("cors");

const connectDB = require("./MongoDBConnect");
const Fashion = require("./FashionSchema");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Fashion Shop REST API is running");
});

app.post("/addProduct", async (req, res) => {
  try {
    const product = new Fashion(req.body);
    await product.save();
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add product",
      details: error.message,
    });
  }
});

app.post("/updateProduct/:name", async (req, res) => {
  try {
    const result = await Fashion.findOneAndUpdate(
      { productName: req.params.name },
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update product",
      details: error.message,
    });
  }
});

app.delete("/deleteProduct/:name", async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.name).trim();

    const result = await Fashion.findOneAndDelete({
      productName: productName,
    });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete product",
      details: error.message,
    });
  }
});


app.get("/seasonTotals/:season", async (req, res) => {
  try {
    const totals = await Fashion.aggregate([
      { $match: { season: req.params.season } },
      {
        $group: {
          _id: "$season",
          totalUnitsSold: { $sum: "$unitsSold" },
          totalReturns: { $sum: "$returns" },
          totalRevenue: { $sum: "$revenue" },
        },
      },
    ]);

    res.json(totals);
  } catch (error) {
    res.status(500).json({
      error: "Failed to calculate season totals",
      details: error.message,
    });
  }
});

app.get("/topProducts/:season/:units", async (req, res) => {
  try {
    const season = req.params.season;
    const units = parseInt(req.params.units);

    const products = await Fashion.find({
      season: season,
      unitsSold: { $gt: units },
    }).limit(10);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch top products",
      details: error.message,
    });
  }
});

app.get("/ratingFilter/:season/:rating", async (req, res) => {
  try {
    const season = req.params.season;
    const rating = parseFloat(req.params.rating);

    const products = await Fashion.find({
      season: season,
      customerRating: { $gte: rating },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Failed to filter products by rating",
      details: error.message,
    });
  }
});

(async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
})();
