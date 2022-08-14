const { MongoClient, ObjectId } = require("mongodb");

// Require constants.
const { STRINGS } = require("../constants");

// Require MongoDB URI from environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Set Mongo options.
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//POST to feed collection
const postFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const recipe = req.body;

  //if nothing povided res with bad req
  if (!recipe) {
    return res.status(400).json({
      status: 400,
      message: "Request missing data.",
      data: { recipe },
    });
  }

  try {
    await client.connect();
    const db = client.db(STRINGS.database);
    const response = await db
      .collection(STRINGS.collections.feed)
      .insertOne(recipe);

    //if insert succesful, res appropriately
    if (response.acknowledged) {
      return res.status(201).json({ status: 201, data: { recipe } });
    } else {
      return res
        .status(500)
        .json({ status: 500, message: "DB did not receive the request." });
    }
  } catch (e) {
    console.error("Error creating recipe:", e);
  } finally {
    client.close();
  }
};

//get all feeds for the feed page, /main page
const getFeeds = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(STRINGS.database);
    const feeds = await db
      .collection(STRINGS.collections.feed)
      .find()
      .toArray();
    console.log(feeds);
    if (feeds) {
      return res.status(200).json({ status: 200, feeds });
    } else {
      return res.status(404).json({ status: 404, message: "No Feeds found" });
    }
  } catch (error) {
    console.error("Error finding any Feed:", e);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again.",
      data: _id,
    });
  } finally {
    client.close();
  }
};

const getFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  try {
    await client.connect();
    const db = client.db(STRINGS.database);
    const feed = await db
      .collection(STRINGS.collections.feed)
      .findOne({ _id: ObjectId(_id) });
    feed
      ? res.status(200).json({ status: 200, feed, message: "success" })
      : res
          .status(404)
          .json({ status: 404, feed, message: "No Feed found" });
  } catch (e) {
    console.error("Error finding this Feed:", e);
  } finally {
    client.close();
  }
};

const patchFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  try {
    await client.connect();
    const db = client.db(STRINGS.database);
    const updateFeed = await db
      .collection(STRINGS.collections.feed)
      .updateOne({ _id: ObjectId(_id) }, { $set: { ...req.body } });
    if (updateFeed.modifiedCount) {
      return res.status(200).json({ status: 200, data: updateFeed });
    } else if (updateFeed.matchedCount) {
      return res.status(200).json({
        status: 200,
        message: "No changes made.",
        data: updateFeed,
      });
    }
  } catch (e) {
    console.error("Error updating this Feed:", e);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again.",
      data: _id,
    });
  } finally {
    client.close();
  }
};

const deleteFeed = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.id;
  try {
    await client.connect();
    const db = client.db(STRINGS.database);
    const deleteRes = await db
      .collection(STRINGS.collections.feed)
      .deleteOne({ _id: ObjectId(_id) });
    if (deleteRes.acknowledged) {
      return res.status(204).json({ status: 204, data: { _id } });
    } else {
      return res
        .status(500)
        .json({ status: 500, message: "DB did not receive the request." });
    }
  } catch (e) {
    console.error("Error deleting Feed", e);
  } finally {
    client.close();
  }
};

module.exports = { postFeed, getFeeds, getFeed, patchFeed, deleteFeed };
