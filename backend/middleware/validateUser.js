const User = require("../models/user");
const mongoose = require("mongoose");

const user = async (req, res, next) => {
  let validId = mongoose.Types.ObjectId.isValid(req.user._id);
  if (!validId) return res.status(400).send("Invalid id");

  let user = await User.findById(req.user._id);

  if (!user) return res.status(400).send("User without permission");
  next();
};

module.exports = user;