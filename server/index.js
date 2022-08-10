"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

const { STRINGS } = require("./constants");

const { getUser } = require("./handlers/users");

express()
  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  //endpoints
  .get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello" });
  })
  .get("/api/user/:_id", getUser)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
