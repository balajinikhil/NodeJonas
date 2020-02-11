const jwt = require("jsonwebtoken");


module.exports.jwt = (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
