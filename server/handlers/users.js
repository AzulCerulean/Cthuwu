const { MongoClient, ObjectId } = require("mongodb");

// Require constants.
const { STRINGS } = require("../constants");

// Require helper functions.
const { asyncEvery } = require("../helpers");

// Require MongoDB URI from environment variables.
require("dotenv").config();
const { MONGO_URI } = process.env;

// Set Mongo options.
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//retreive user info from db
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // Extract the user id from the request.
  const _id = req.params._id;

  try {
    await client.connect();
    const db = client.db("cthuwu-db");

    //fetch user from db
    const data = await db.collection("users").findOne({ _id: ObjectId(_id) });

    // Verify if data was received and respond appropriately.
    if (data) {
      return res.status(200).json({ status: 200, data });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "No user found.", data: { _id } });
    }
  } catch (e) {
    console.error("Error retrieving user data:", e);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again.",
    });
  } finally {
    client.close();
  }
};

module.exports = { getUser };
