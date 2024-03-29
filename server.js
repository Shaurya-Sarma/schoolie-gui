//Install express server
const express = require("express");
const path = require("path");
var sslRedirect = require("heroku-ssl-redirect");

const app = express();

app.use(sslRedirect());

app.get("/config", function (req, res) {
  res.json({ api_url: process.env.API_URL });
});

// Serve only the static files form the dist directory

app.use(express.static(__dirname + "/dist/schoolie-gui"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/schoolie-gui/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
