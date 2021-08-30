const Board = require("../models/board");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const saveTask = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  let board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
  });

  let result = await board.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });
};

const listTask = async (req, res) => {
  let board = await Board.find({ userId: req.user._id });
  if (!board || board.length === 0)
    return res.status(400).send("You have no assigned tasks");
  return res.status(200).send({ board });
};

const saveTaskImg = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Incomplete data");

  //console.log(req.files);
  let imageUrl = ""; //http://localhost:3001/uploads/23658538.png        -   C:/user/desktop/js.png
  if (req.files !== undefined && req.files.image.type) {
    let url = req.protocol + "://" + req.get("host") + "/";
    let serverImg =
      "./uploads/" + moment().unix() + path.extname(req.files.image.path);
    fs.createReadStream(req.files.image.path).pipe(
      fs.createWriteStream(serverImg)
    );
    imageUrl =
      url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
  }

  let board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    taskStatus: "to-do",
    imageUrl: imageUrl,
  });

  let result = await board.save();
  if (!result) return res.status(400).send("Error registering task");
  return res.status(200).send({ result });
};

const updateTask = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validId) return res.status(400).send("Invalid id");

  if (!req.body._id || !req.body.taskStatus)
    return res.status(400).send("Incomplete data");

  let board = await Board.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    taskStatus: req.body.taskStatus,
  });

  if (!board) return res.status(400).send("Task not found");
  return res.status(200).send({ board });
};

const deleteTask = async (req, res) => {
  let validId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validId) return res.status(400).send("Invalid id");

  let board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(400).send("Task not found");
  return res.status(200).send({ message: "Task deleted"}); //Enviar los mensajes como un JSON
};

module.exports = { saveTask, listTask, updateTask, deleteTask, saveTaskImg };