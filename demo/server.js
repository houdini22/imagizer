const express = require("express");
const app = express();
const path = require("path");
const public = path.join(__dirname, ".");

// viewed at http://localhost:8080
app.get("/", function (req, res) {
  res.sendFile(path.join(public, "browser-demo.html"));
});

app.get("/browser-demo.js", function (req, res) {
  res.sendFile(path.join(public, "../dist/browser-demo.js"));
});

app.get("/test.png", function (req, res) {
  res.sendFile(path.join(public, "test.png"));
});

app.listen(8080);
console.log("Listening on http://localhost:8080");
