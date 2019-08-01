const DB_URL = "mongodb://localhost:27017/test";
const mongoose = require("mongoose");

module.exports = function(app) {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true
  });

  let db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log(" -*- Database is connected -*-");
  });
};
