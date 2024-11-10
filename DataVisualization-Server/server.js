const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const Data = require("./models/DataModel");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all origins

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Route to fetch all data or with filters
app.get("/api/data", async (req, res) => {
  try {
    const filter = {}; // Add filter conditions based on request queries if needed
    const data = await Data.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Aggregation routes

// 1. Average Intensity by Country
app.get("/api/intensity-by-country", async (req, res) => {
  try {
    // Fetching the data without any filter conditions
    const data = await Data.aggregate([
      { $group: { _id: "$country", avgIntensity: { $avg: "$intensity" } } },
      { $sort: { avgIntensity: -1 } }, // Sorting countries by intensity
    ]);

    res.json(data); // Return the data to the frontend
  } catch (error) {
    console.error("Error in intensity-by-country:", error);
    res.status(500).send("Server error");
  }
});

// 2. Relevance Over Time
app.get("/api/relevance-over-time", async (req, res) => {
  const { startYear, endYear } = req.query;

  // Validate and parse startYear and endYear
  const start = startYear ? parseInt(startYear) : null;
  const end = endYear ? parseInt(endYear) : null;

  // Initialize the match object to filter data based on year range
  const match = {};

  // If startYear is provided, add it to the match condition for 'start_year'
  if (start) match.start_year = { $gte: start };

  // If endYear is provided, add it to the match condition for 'end_year'
  if (end) match.end_year = { $lte: end };

  try {
    // Aggregation query to group by start_year and calculate the average relevance
    const data = await Data.aggregate([
      { $match: match }, // Filter based on year range
      {
        $group: {
          _id: "$start_year",
          avgRelevance: { $avg: "$relevance" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by year in ascending order
    ]);

    // Format data to return the year and average relevance in a chart-friendly format
    const formattedData = data.map((item) => ({
      year: item._id, // Use _id as year
      avgRelevance: item.avgRelevance.toFixed(1), // Round average relevance to 1 decimal place
    }));

    // Send the formatted data as JSON response
    res.json(formattedData);
  } catch (error) {
    console.error("Error in relevance-over-time:", error);
    res.status(500).send("Server error");
  }
});

// 3. Topics by Region
app.get("/api/topics-by-region", async (req, res) => {
  try {
    const data = await Data.aggregate([
      { $group: { _id: "$region", topics: { $addToSet: "$topic" } } },
    ]);
    res.json(data);
  } catch (error) {
    console.error("Error in topics-by-region:", error);
    res.status(500).send("Server error");
  }
});

// 4. Likelihood by City
app.get("/api/likelihood-by-city", async (req, res) => {
  const { country } = req.query;
  const match = {};
  if (country) match.country = country;

  try {
    const data = await Data.aggregate([
      { $match: match },
      { $group: { _id: "$city", avgLikelihood: { $avg: "$likelihood" } } },
      { $sort: { avgLikelihood: -1 } },
    ]);
    res.json(data);
  } catch (error) {
    console.error("Error in likelihood-by-city:", error);
    res.status(500).send("Server error");
  }
});

// Route to fetch data with multiple filters
app.get("/api/filterData", async (req, res) => {
  try {
    const {
      startYear,
      endYear,
      topic,
      sector,
      region,
      country,
      city,
      pestle,
      source,
      swot,
    } = req.query;

    // Building the dynamic filter object
    const filter = {};

    if (startYear) filter.start_year = { $gte: parseInt(startYear) };
    if (endYear)
      filter.end_year = { ...filter.end_year, $lte: parseInt(endYear) };
    if (topic) filter.topic = topic;
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (country) filter.country = country;
    if (city) filter.city = city;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (swot) filter.swot = swot;

    // Fetch filtered data from the database
    const data = await Data.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
