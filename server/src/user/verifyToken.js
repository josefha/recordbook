let jwt = require("jsonwebtoken");

module.exports = tokenHeader => {
  let token = tokenHeader.replace("Bearer ", "");
  console.log("TCL: token", token);
  try {
    console.log("TCL: truong");
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    console.log("TCL: error", error);
    return false;
  }
};
