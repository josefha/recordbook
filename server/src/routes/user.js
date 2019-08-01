const User = require("../db/schema").User;
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

module.exports = ({ router }) => {
  // Create user
  router.post("/user/create", async ctx => {
    let req = ctx.request.body;

    if (!req.email && !req.name && !req.password) {
      ctx.status = 400;
      ctx.body = { message: "Bad Request" };
    }

    let email = req.email.toLowerCase();
    let name = req.name.toLowerCase();
    let password = req.password;
    let userData = {
      email: email,
      name: name,
      password: password
    };

    // look if user is already in db
    let user = await User.findOne({ email: email }).exec();
    console.log(user);
    if (user) {
      ctx.response.status = 401;
      ctx.body = "Email already registerd";
    } else {
      let user = new User(userData);
      await user.save();
      const token = await jwt.sign(
        { email: email },
        process.env.JWT_SECRET_KEY
      );

      ctx.response.status = 200;
      ctx.body = { token: token };
    }
  });
  // Login and return Token
  router.post("/user/login", async ctx => {
    let req = ctx.request.body;
    console.log("TCL: req", req);
    let password = req.password;
    let email = req.email;
    email = email.toLowerCase();

    let user = await User.findOne({ email: email }).exec();
    if (user == null) {
      ctx.status = 401;
      ctx.body = { message: "wrong email or password" };
    } else {
      let passwordMatched = await bcrypt.compare(password, user.password);

      if (passwordMatched === true) {
        let token = jwt.sign({ email: email }, "shhhhh");
        ctx.response.status = 200;
        ctx.body = {
          message: "login ok",
          token: token
        };
      } else {
        ctx.status = 401;
        ctx.body = { message: "Wrong email or password" };
      }
    }
  });

  router.get("/user/verify", async ctx => {
    let token = ctx.request.body.token;

    try {
      let email = jwt.verify(token, "shhhhh");
      ctx.status = 200;
      ctx.body = { message: "valid token" };
    } catch (error) {
      ctx.status = 400;
      ctx.body = { message: "Invalid token" };
    }
  });
};
