const express = require("express");

const router = express.Router();

const User = require("../models/user");

// Get the list of users
router.get("/", (req, res) => {
  User.find({})
    .then((users) => {
      res
        .status(200)
        .send({ success: true, responseStatus: 200, data: users });
    })
    .catch((err) => {
      const errorJson = {
        error: err.message,
        status: 500,
        Comments: "Unable to fetch data from the Database",
      };
      res.send(errorJson);
    });
});

//Find user by specific age
router.get("/user/:age", (req, res) => {
  User.findOne({ age: req.params.age })
    .then((response) => {
      res
        .status(200)
        .send({ success: true, responseStatus: 200, data: response });
    })
    .catch((err) => {
      const errorJson = {
        error: err.message,
        status: 500,
        Comments: "Unable to find user by this Id",
      };
      res.send(errorJson);
    });
});

//Post(send) data(new user) to the database
router.post("/", (req, res) => {
  console.log("post used")
  console.log(req.body)
  User.create(req.body)
    .then((response) =>
      res
        .status(200)
        .send({ success: true, responseStatus: 200, data: response })
    )
    .catch((err) => {
      console.log("error post")
      const errorJson = {
        error: err.message,
        responseStatus: 500,
        Comments: "Unable to create user",
      };
      res.send(errorJson);
    });
});

//Update creds of a specific user with data being in json headers with password verification
router.put("/user/:id", (req, res) => {
  const pass = req.body.password;

  User.findById(req.params.id)
    .then((response) => {
      if (pass === response.password) {
        User.findByIdAndUpdate(req.params.id, req.body.data).then((response) =>
          User.findById(req.params.id).then((response) => {
            res
              .status(200)
              .send({ success: true, responseStatus: 200, data: response });
          })
        );
      } else {
        res.send({
          success: false,
          responseStatus: 200,
          message: "Password is wrong for this user",
        });
      }
    })
    .catch((err) => {
      const errorJson = {
        error: err.message,
        status: 500,
        Comments: "Unable to find user by this Id",
      };
      res.send(errorJson);
    });
});

//Delete a specific use by their id
//Also adding a password verification in header
router.delete("/user/:id", (req, res) => {
  const pass = req.body.password;

  User.findById(req.params.id)
    .then((response) => {
      if (pass === response.password) {
        User.findByIdAndRemove(req.params.id).then((response) =>
          res
            .status(200)
            .send({ success: true, responseStatus: 200, data: response })
        );
      } else {
        res.send({
          success: false,
          responseStatus: 200,
          message: "Password is wrong for this user",
        });
      }
    })
    .catch((err) => {
      const errorJson = {
        error: err.message,
        status: 500,
        Comments: "Unable to find user by this Id",
      };
      res.send(errorJson);
    });
});

module.exports = router;
