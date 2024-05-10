let jwt = require("jsonwebtoken");

validate = (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    try {
      const verifyToken = jwt.verify(token, "123");
      console.log(verifyToken);
      next();
    } catch (error) {
      console.log(error);
      res.sent(error);
    }
  } else {
    res.json("no token provided");
  }
};
module.exports = validate;
