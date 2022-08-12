// Store required strings for the backend as constants.
const STRINGS = {
  database: "cthuwu-db",
  collections: {
    users: "users",
    feed: "feed",
  },
  endpoints: {
    user: "/api/user/:_id",
    feed_id: "/api/feed/:_id",
  },
};

module.exports = { STRINGS };
