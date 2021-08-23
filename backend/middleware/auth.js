const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");

  jwtToken = jwtToken.split(" ")[1];
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");

  try {
    let payload = await jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(400).send("Authorization denied: Invalid token");
  }
};

module.exports = auth;