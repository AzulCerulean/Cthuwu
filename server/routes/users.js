const router = require("express").Router();

//require constants
const { STRINGS } = require("../constants");

//require endpoint handlers
const { getUser } = require("../handlers/users");

//retrieve user info
router.get(STRINGS.endpoints.user, getUser);

module.exports = router;
