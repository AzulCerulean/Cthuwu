// Emulates Array.prototype.every() with an async callback.
// Algorithm found at https://advancedweb.hu/how-to-use-async-functions-with-array-some-and-every-in-javascript/
const asyncEvery = async (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    if (!(await callback(arr[i]))) {
      return false;
    }
  }

  return true;
};

module.exports = { asyncEvery };
