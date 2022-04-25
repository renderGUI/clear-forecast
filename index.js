const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

// Rate limit
const limiter = rateLimit({ // Make only make 5 requests per 10 minutes.
  windowMs: 10 * 60 * 1000,
  max: 5,
});
app.use(limiter);
app.set("trust proxy", 1);

// set static folder
app.use(express.static("public"));

// routes
app.use("/api", require("./routes"));

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
