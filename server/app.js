const Koa = require("koa");
const logger = require("koa-logger");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const app = new Koa();
require("dotenv").config();

// log all events to the terminal
app.use(logger());

// Use the bodyparser middlware
app.use(BodyParser());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, ctx);
  }
});

//Connect to DB
require("./src/db/mongo")(app);

// instantiate our new Router
const router = new Router();

// require our external routes and pass in the router
require("./src/routes/lift")({ router });
require("./src/routes/user")({ router });

// tells the router to use all the routes that are on the object
app.use(router.routes());
app.use(router.allowedMethods());

// tell the server to listen to events on a specific port
const server = app.listen(3000);
module.exports = server;
