const express = require("express");
const bodyParser = require("body-parser");
const model = require("./model");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.post("/predict", async (req, res) => {
  const { input } = req.body;
  const result = await model.predict(input);
  res.json(result);
});

app.listen(5000, async () => {
  console.log("Server started on port 5000");
  console.log("Loading model...");
  await model.load();
  console.log("Model loaded");
});
