const express = require("express");
const apiPost = express.Router();
const Teacher = require("../../models/teachers");
const Student = require("../../models/students");
const Employee = require("../../models/employee");
const Order = require("../../models/orders");
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
module.exports = apiPost;
