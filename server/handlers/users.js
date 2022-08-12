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

const postUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  //grab the req body
  const userInfo = req.body;
  const username = req.body.username;
  const email = req.body.email;

  //if nothing povided res with bad req
  if (!userInfo) {
    return res.status(400).json({
      status: 400,
      message: "Request missing data.",
      data: { userInfo },
    });
  }

  try {
    await client.connect();
    const db = client.db(STRINGS.database);

    //check to see if user is available
    const userData = await db
      .collection(STRINGS.collections.users)
      .findOne({ username });

    const findSeat = seatsArr.find((seat) => seat.id === seatID);
    if (!findSeat.isAvailable) {
      res.status(404).json({ status: 404, message: "seat not available" });
      return;
    }

    const response = await db
      .collection(STRINGS.collections.users)
      .insertOne(userInfo);

    //if insert succesful, res appropriately
    if (response.acknowledged) {
      return res.status(201).json({ status: 201, data: { userInfo } });
    } else {
      return res
        .status(500)
        .json({ status: 500, message: "DB did not receive the request." });
    }
  } catch (e) {
    console.error("Error creating user:", e);
  } finally {
    client.close();
  }
};

module.exports = { getUser, postUser };
