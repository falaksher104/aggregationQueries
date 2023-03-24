const express = require("express");
const apiPost = express.Router();
const Teacher = require("../../models/teachers");
const Student = require("../../models/students");
const Employee = require("../../models/employee");
const Order = require("../../models/orders");
const Sale = require("../../models/sales");
const Score = require("../../models/scores");
const Furniture = require("../../models/furnitures");
const User = require("../../models/multipleJoins/users");
const Note = require("../../models/multipleJoins/notes");

apiPost.post("/api/teachers/new", async (req, res) => {
  const { name, age, gender } = req.body;
  const teacher = await Teacher.create({
    name,
    age,
    gender,
  });
  res.json({ success: teacher });
});
apiPost.post("/api/students/new", async (req, res) => {
  const { name, hobbies, hasMacBook, bio, experience, age } = req.body;
  const student = await Student.create({
    name,
    hobbies,
    hasMacBook,
    bio,
    experience,
    age,
  });
  res.json({ success: student });
});
apiPost.post("/api/companyEmployee/new", async (req, res) => {
  const { companyName, employeeName, gender } = req.body;
  const employee = await Employee.create({
    companyName,
    employeeName,
    gender,
  });
  res.json({ success: employee });
});

apiPost.post("/api/orders/new", async (req, res) => {
  const { productName, categoryName, price, status } = req.body;
  const order = await Order.create({
    productName,
    categoryName,
    price,
    status,
  });
  res.json({ order });
});

apiPost.post("/api/sales/new", async (req, res) => {
  const { product, amount, date } = req.body;
  const sale = await Sale.create({
    product,
    amount,
    date,
  });
  res.json({ sale });
});
apiPost.post("/api/scores/student/new", async (req, res) => {
  const { classId, studentId, scores } = req.body;
  const studentScores = await Score.create({
    classId,
    studentId,
    scores,
  });
  res.json({ studentScores });
});
//Furniture
apiPost.post("/api/furniture", async (req, res) => {
  const { name, price, countryName, quantity } = req.body;
  const furniture = await Furniture.create({
    name,
    price,
    countryName,
    quantity,
  });
  res.json({ furniture, success: true });
});
// create user
apiPost.post("/api/user/new", async (req, res) => {
  const { name, emailAddress, location } = req.body;
  const user = await User.create({
    name,
    emailAddress,
    location,
  });
  res.json({ user });
});
// create notes of user
apiPost.post("/api/user/notes/create", async (req, res) => {
  const { userId, title, description } = req.body;
  const note = await Note.create({
    userId,
    title,
    description,
  });
  res.json({ note });
});
module.exports = apiPost;
