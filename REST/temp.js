const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Wikipedia API endpoint
const WIKIPEDIA_API_URL = "https://en.wikipedia.org/w/api.php";

// Route to fetch data from Wikipedia
app.get("/api/wiki/:title", async (req, res) => {
  const { title } = req.params;

  try {
    // API parameters
    const params = {
      action: "query",
      format: "json",
      titles: title,
      prop: "extracts",
      exintro: true,
      explaintext: true,
    };

    // Make a GET request to Wikipedia API
    const response = await axios.get(WIKIPEDIA_API_URL, { params });

    // Extract page content
    const page = Object.values(response.data.query.pages)[0];
    if (page.missing) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json({
      title: page.title,
      extract: page.extract,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});