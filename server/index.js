"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = 8000;

const { getUser, postUser } = require("./handlers/users");
const { postFeed, getFeeds, getFeed, patchFeed, deleteFeed } = require("./handlers/feed");

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
  //user endpoints
  .get("/api/user/:_id", getUser)
  .post("/api/signup", postUser)

  //feed endpoints
  .post("/api/feed", postFeed)
  .get("/api/feed", getFeeds)
  .get("/api/feed/:id", getFeed)
  .patch("/api/feed/:id", patchFeed)
  .delete("/api/feed/:id", deleteFeed)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
