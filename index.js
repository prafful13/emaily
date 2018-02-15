const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
require("./models/User");
require("./services/passport");
mongoose.connect(keys.mongoURI);

mongoose.connection.on("connected", function() {
  console.log("Mongoose connected");
});

mongoose.connection.on("open", function(err) {
  console.log("Mongoose open");
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
