const url = require("url");
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");

// environment variables
const BASE_ENDPOINT = process.env.BASE_ENDPOINT;
const API_KEY_PARAM_NAME = process.env.API_KEY_PARAM_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// initialize cache
let cache = apicache.middleware

router.get("/", cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_PARAM_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiResponse = await needle("get", `${BASE_ENDPOINT}?${params}`);
    const data = apiResponse.body;

    // LOG REQUEST
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${BASE_ENDPOINT}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
