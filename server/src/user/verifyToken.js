let jwt = require("jsonwebtoken");

module.exports = tokenHeader => {
  let token = tokenHeader.replace("Bearer ", "");
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return false;
  }
};
