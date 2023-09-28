const Task = require("../models/task");
const validateId = require("../utils/validatedID");

const getAllTask = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
};

// const createTask = async (req, res) => {
//   const task = await Task.create({
//     name: "Opeyemi11",
//     age: 90,
//     nickName: "Barxx",
//     job: "dev",
//   });
//   res.status(201).json({ message: "Task created successully", newTask: task });
// };

// const createTask = async (req, res) => {
//   const task = await Task.create(req.body);
//   res.status(201).json({ message: "Task created successfully", newTask: task });
// };

const createTask = async (req, res) => {
  const { title, description, tag } = req.body;

  if (!title) {
    return res.status(400).json({ message: "please provide title" });
  }
  if (!description) {
    return res.status(400).json({ message: "please provide description" });
  }
  if (!tag) {
    return res.status(400).json({ message: "please provide tag" });
  }

  const task = await Task.create(req.body);
  res.status(201).json({ message: "Task created successfully", newTask: task });
};
const editTask = async (req, res) => {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({ message: `ID: ${id} is not valid` });
  }


  const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!task) {
    return res.status(400).json({ message: `No Task with ID:${id}` });
  }
  res.status(200).json({ message: "Task Updated Successfully" });
};
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({ message: `ID: ${id} is not valid` });
  }

  const task = await Task.findOneAndDelete({ _id: id });
  if (!task) {
    return res.status(400).json({ message: `No Task with ID:${id}` });
  }
  res.status(200).json({ message: `Task Succesfully Deleted` });
};
const getEachTask = async (req, res) => {
  const { id } = req.params;

  if (!validateId(id)) {
    return res.status(400).json({ message: `ID: ${id} is not valid` });
  }

  const task = await Task.findOne({ _id: id });
  if (!task) {
    return res.status(400).json({ message: `No Task with ID:${id}` });
  }
  res.status(200).json({ task });
};

module.exports = {
  getAllTask,
  createTask,
  editTask,
  deleteTask,
  getEachTask,
};
