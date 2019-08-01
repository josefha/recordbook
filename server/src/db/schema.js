const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//hashing a password before saving it to the database
UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model("User", UserSchema);

var LiftSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  liftType: {
    type: String,
    required: true,
    trim: true
  },
  repCount: {
    type: Number,
    required: true
  },
  liftWeight: {
    type: Number,
    required: true
  },
  Date: {
    type: Date,
    required: true
  }
});

var Lift = mongoose.model("LiftRecord", LiftSchema);

module.exports = { User, Lift };
