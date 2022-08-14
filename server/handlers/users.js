const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

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
//see another person's profile
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

//create a new user
const postUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  //grab the req body
  const userInfo = req.body;
  const username = req.body.username;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, salt);

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
    const findUsername = await db
      .collection(STRINGS.collections.users)
      .findOne({ username });
    if (findUsername) {
      //seems like big companies return 200 even
      // if resource is found and nothing was created
      return res.status(200).json({
        status: 200,
        message: "username is already taken",
        data: { username },
      });
    }
    const findEmail = await db
      .collection(STRINGS.collections.users)
      .findOne({ email });
    if (findEmail) {
      return res.status(200).json({
        status: 200,
        message: "email is already taken",
        data: { email },
      });
    }

    // create a new body for adding to db to encrypt password
    const newUserInfo = {
      username: username,
      email: email,
      password: password,
    };

    const response = await db
      .collection(STRINGS.collections.users)
      .insertOne(newUserInfo);

    //if insert succesful, res appropriately
    if (response.acknowledged) {
      return res.status(201).json({ status: 201, data: { newUserInfo } });
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

//this one will be used for the UserContext
//once logged in, it will contain the data on the user
const getLogIn = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // Extract the user info from the request.
  const userInfo = req.body;
  const username = req.body.username;
  const password = req.body.password;

  //if nothing povided res with bad req
  if (!userInfo) {
    return res.status(400).json({
      status: 400,
      message: "Request missing data.",
    });
  }

  try {
    await client.connect();
    const db = client.db("cthuwu-db");

    //fetch user from db
    const data = await db.collection("users").findOne({ username: username });

    if (!data) {
      return res
        .status(200)
        .json({ status: 200, message: "No user found.", data: username });
    }

    const hash = data.password;
    const comparePass = bcrypt.compareSync(password, hash);

    //if comparePass is false, return wrong password message
    if (!comparePass) {
      return res
        .status(200)
        .json({ status: 200, message: "incorrect password" });
    }

    //variable for the response, to ommit sending password in the FE
    const newData = {
      _id: ObjectId(data._id),
      username: username,
      email: data.email,
    };

    console.log(newData);

    // Verify if data was received and respond appropriately.
    if (data) {
      return res
        .status(200)
        .json({ status: 200, newData, message: "Logged in!" });
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

module.exports = { getUser, postUser, getLogIn };
