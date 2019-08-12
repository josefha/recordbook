const Lift = require("../db/schema").Lift;
const verifyToken = require("../user/verifyToken");

module.exports = ({ router }) => {
  // Create record
  router.post("/lift/create", async ctx => {
    let body = ctx.request.body;
    let userData = verifyToken(ctx.request.header.token);

    if (!userData) {
      ctx.status = 403;
      ctx.body = { message: "Bad Request, token not valid" };
      return;
    }

    if ((!body.email && !body.liftType && !body.repCount, !body.liftWeight)) {
      ctx.status = 400;
      ctx.body = { message: "Bad Request, parameters missing" };
      return;
    }

    const liftData = {
      email: body.email,
      liftType: body.liftType,
      repCount: body.repCount,
      liftWeight: body.liftWeight,
      Date: new Date()
    };

    try {
      let lift = new Lift(liftData);
      await lift.save();
      ctx.response.status = 200;
    } catch (error) {
      console.log("TCL: error", error);
      ctx.response.status = 400;
      ctx.response.body = "lift could not be saved ";
    }
  });

  router.post("/lift/init", async ctx => {
    let body = ctx.request.body;
    let userData = verifyToken(ctx.request.header.token);
    console.log("TCL: userData", userData);

    if (!userData) {
      ctx.status = 403;
      ctx.body = { message: "Bad Request, cant find user" };
      return;
    }

    const email = userData.email;

    if (
      !body.benchValue &&
      !body.deadliftValue &&
      !body.squatValue &&
      !body.overheadValue
    ) {
      ctx.status = 400;
      ctx.body = { message: "Bad Request, parameters missing" };
      return;
    }
    const liftData = {
      email: email,
      liftType: 0,
      repCount: 1,
      liftWeight: 0,
      Date: new Date()
    };

    try {
      let lift1 = new Lift({
        ...liftData,
        liftType: "bench",
        liftWeight: body.benchValue
      });
      let lift2 = new Lift({
        ...liftData,
        liftType: "squat",
        liftWeight: body.squatValue
      });
      let lift3 = new Lift({
        ...liftData,
        liftType: "overhead",
        liftWeight: body.overheadValue
      });
      let lift4 = new Lift({
        ...liftData,
        liftType: "deadlift",
        liftWeight: body.deadliftValue
      });
      await Lift.insertMany([lift1, lift2, lift3, lift4]);
      ctx.response.status = 200;
    } catch (error) {
      console.log("TCL: error", error);
      ctx.response.status = 400;
      ctx.response.body = "lift could not be saved ";
    }
  });

  // liftType and repCount is optional
  // Check token before and get email ?
  router.get("/lift/all", async ctx => {
    let req = ctx.request.body;

    if (!req.email) {
      ctx.status = 400;
      ctx.body = { message: "Bad Request, parameters missing" };
    }

    let Lifts = null;
    if (req.liftType && req.repCount) {
      Lifts = await Lift.find({
        email: req.email,
        liftType: req.liftType,
        repCount: req.repCount
      }).exec();
    } else if (req.liftType) {
      Lifts = await Lift.find({
        email: req.email,
        liftType: req.liftType
      }).exec();
    } else {
      Lifts = await Lift.find({
        email: req.email
      }).exec();
    }

    if (Lifts == null) {
      ctx.status = 401;
      ctx.body = { message: "wrong email or password" };
    } else {
      if (Lifts.length < 1) {
        ctx.status = 402;
        ctx.body = { message: "no lifts found" };
      } else {
        // Lifts = Lifts.sort((a, b) => (a.date > b.date ? -1 : 1));

        ctx.status = 200;
        ctx.body = Lifts;
      }
    }
  });

  // amount is needed
  // liftType, repCount
  // Check token before and get email ?
  router.get("/lift/top", async ctx => {
    let req = ctx.request.body;

    if (!req.email && !req.liftType && !req.repCount && !req.amount) {
      ctx.status = 400;
      ctx.body = { message: "Bad Request, parameters missing" };
    }

    let Lifts = await Lift.find({
      email: req.email,
      liftType: req.liftType,
      repCount: req.repCount
    }).exec();

    if (Lifts == null) {
      ctx.status = 401;
      ctx.body = { message: "wrong email or password" };
    } else {
      if (Lifts.length < 1) {
        ctx.status = 402;
        ctx.body = { message: "no lifts found" };
      } else {
        Lifts = Lifts.sort((a, b) => (a.liftWeight > b.liftWeight ? -1 : 1));

        Lifts = Lifts.slice(0, req.amount);
        ctx.status = 200;
        ctx.body = Lifts;
      }
    }
  });

  // Check token before and get email ?
  router.get("/lift/best", async ctx => {
    let req = ctx.request.body;

    if (!req.email && !req.liftType && !req.repCount) {
      ctx.status = 400;
      ctx.body = { message: "Bad Request, parameters missing" };
    }

    let Lifts = await Lift.find({
      email: req.email,
      liftType: req.liftType,
      repCount: req.repCount
    }).exec();

    if (Lifts == null) {
      ctx.status = 401;
      ctx.body = { message: "wrong email or password" };
    } else {
      if (Lifts.length < 1) {
        ctx.status = 402;
        ctx.body = { message: "no lifts found" };
      } else {
        Lifts = Lifts.sort((a, b) => (a.liftWeight > b.liftWeight ? -1 : 1));
        let lift = Lifts[0];
        ctx.status = 200;
        ctx.body = lift;
      }
    }
  });
};
