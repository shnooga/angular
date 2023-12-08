const express = require("express");
const CRAP_JSON = require('./crap.json');
const PATHWAY_JSON = require('./pathway.json');
const SKILL_JSON = require('./skill.json');
const STUDENTINFO_JSON = require('./studentinfo.json');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// Read json encoded body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
);

app.get("/crap_version", (req, res) => {
  console.log(CRAP_JSON);
  res.send(CRAP_JSON);
});

app.get("/pathway_version", (req, res) => {
  console.log(PATHWAY_JSON);
  res.send(PATHWAY_JSON);
});

app.get("/skill_version", (req, res) => {
  console.log(SKILL_JSON);
  res.send(SKILL_JSON);
});

app.get("/studentinfo_version", (req, res) => {
  console.log(STUDENTINFO_JSON);
  res.send(STUDENTINFO_JSON);
});

app.listen(port, () => {
  console.log("Listening on port %s...", port);
});

