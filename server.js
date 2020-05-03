//Install express server
const express = require("express");
const path = require("path");
const env = process.env.API_URL || 8080;

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/schoolie-gui"));

var forceSsl = function (req, res, next) {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  return next();
};

app.configure(function () {
  if (env === "https://schoolie-api.herokuapp.com") {
    app.use(forceSsl);
  }
});

app.get("/config", function (req, res) {
  res.json({ api_url: process.env.API_URL });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/schoolie-gui/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
