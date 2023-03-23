const express = require("express");
const apiGet = express.Router();
const Teacher = require("../../models/teachers");
const Student = require("../../models/students");
const Employee = require("../../models/employee");
const Order = require("../../models/orders");
const Sale = require("../../models/sales");
const Score = require("../../models/scores");
const Furniture = require("../../models/furnitures");

apiGet.get("/api/get/teachers/male", async (req, res) => {
  const maleTeachers = await Teacher.aggregate([
    { $match: { gender: "male" } },
  ]);
  res.json({ maleTeachers });
});
//group teachers by age
// and show all teacher  names group by age

apiGet.get("/api/get/teachers/groupTeachersByAge", async (req, res) => {
  const Teachers = await Teacher.aggregate([
    { $group: { _id: "$age", names: { $push: "$name" } } },
  ]);
  res.json({ Teachers });
});

// group teachers by age and also show complete document per age group
apiGet.get("/api/get/teachers/groupAllTeachersDataByAge", async (req, res) => {
  const Teachers = await Teacher.aggregate([
    { $group: { _id: "$age", names: { $push: "$$ROOT" } } },
  ]);
  res.json({ Teachers });
});

// give a count per age of male teachers
apiGet.get(
  "/api/get/teachers/getCountPerAgeOfMaleTeachers",
  async (req, res) => {
    const Teachers = await Teacher.aggregate([
      { $match: { gender: "male" } },
      { $group: { _id: "$age", count: { $sum: 1 } } },
    ]);
    res.json({ Teachers });
  }
);
apiGet.get(
  "/api/get/teachers/getCountsPerAgeOfMaleTeachersAndSortInDESC",
  async (req, res) => {
    const Teachers = await Teacher.aggregate([
      { $match: { gender: "male" } },
      { $group: { _id: "$age", numberOfTeachers: { $sum: 1 } } },
      { $sort: { numberOfTeachers: -1 } },
    ]);
    res.json({ Teachers });
  }
);
apiGet.get(
  "/api/get/teachers/getMaxCountsPerAgeOfMaleTeachersAndSortInDESC",
  async (req, res) => {
    const Teachers = await Teacher.aggregate([
      { $match: { gender: "male" } },
      { $group: { _id: "$age", numberOfTeachers: { $sum: 1 } } },
      { $sort: { numberOfTeachers: -1 } },
      {
        $group: {
          _id: null,
          maxNumberInAgeGroup: { $max: "$numberOfTeachers" },
        },
      },
    ]);
    res.json({ Teachers });
  }
);
// sum of ages in each age group
apiGet.get("/api/get/teachers/sumOfAgesInEachAgeGroup", async (req, res) => {
  const sumOfAges = await Teacher.aggregate([
    {
      $group: {
        _id: "$age",
        sumOfAges: { $sum: { $toDouble: "$age" } },
      },
    },
  ]);
  res.json({
    sumOfAges,
  });
});
// students
// find hobbies per age group
apiGet.get("/api/students/findhobbiesperagegroup", async (req, res) => {
  const hobbies = await Student.aggregate([
    { $group: { _id: "$age", hobbies: { $push: "$hobbies" } } },
  ]);
  res.json({ hobbies });
});
apiGet.get(
  "/api/students/findhobbiesperagegroupusingunwind",
  async (req, res) => {
    const hobbies = await Student.aggregate([
      { $unwind: "$hobbies" },
      { $group: { _id: "$age", hobbies: { $push: "$hobbies" } } },
    ]);
    res.json({ hobbies });
  }
);
// find number of students per each hobby
apiGet.get(
  "/api/students/findNumberOfStudentsPerEachHobby",
  async (req, res) => {
    const students = await Student.aggregate([
      { $unwind: "$hobbies" },
      { $group: { _id: "$hobbies", numberOfStudents: { $sum: 1 } } },
    ]);
    res.json({ students });
  }
);
// find average age of all students
apiGet.get("/api/students/findAverageAgeOfAllStudents", async (req, res) => {
  const AverageAge = await Student.aggregate([
    { $group: { _id: null, averageAge: { $avg: "$age" } } },
  ]);
  res.json({ AverageAge });
});
//find total number of hobbies of all students
apiGet.get(
  "/api/students/findTotalNumberOfHobbiesOfAllStudents",
  async (req, res) => {
    const numberOfHobbies = await Student.aggregate([
      {
        $group: {
          _id: null,
          numberOfHob: { $sum: { $size: { $ifNull: ["$hobbies", []] } } },
        },
      },
    ]);
    res.json({ numberOfHobbies });
  }
);

// list of all hobbies
apiGet.get("/api/students/listOfAllHobbies", async (req, res) => {
  const listOfAllHobbies = await Student.aggregate([
    { $unwind: "$hobbies" },
    { $group: { _id: null, list: { $addToSet: "$hobbies" } } },
  ]);
  res.json({ listOfAllHobbies });
});

// find hobbies of those students whose age is greater than 23
apiGet.get(
  "/api/students/findHobbiesOfThoseStudentsWhoseAgeisGreaterThan23",
  async (req, res) => {
    const hobbies = await Student.aggregate([
      {
        $group: {
          _id: null,
          hobbies: {
            $addToSet: {
              $filter: {
                input: "$hobbies",
                as: "hobby",
                cond: { $gt: ["$age", 23] },
              },
            },
          },
        },
      },
    ]);
    res.json({ hobbies });
  }
);

// employee

apiGet.get("/api/employee/get", async (req, res) => {
  const employees = await Employee.aggregate([
    {
      $group: {
        _id: { companyName: "$companyName", gender: "$gender" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        companyName: "$_id.companyName",
        gender: "$_id.gender",
        count: 1,
      },
    },
  ]);
  res.json({ employees });
});

apiGet.get("/api/getData", async (req, res) => {
  // const data = await Student.find();
  // update field value
  // const data = await Student.updateOne(
  //   {
  //     _id: "641414083a70b212ac7ed0fc",
  //   },
  //   { hasMacBook: "false" }
  // );
  //get condition field
  // const data = await Student.find({ hasMacBook: true });
  // const data = await Student.find({ hobbies: "Programming" });
  // const data = await Student.find({ experience: { $exists: true } });
  // const data = await Student.find({
  //   $and: [{ hobbies: "Programming", age: { $gte: 22 }, name: "Aqsa" }],
  // });
  // const data = await Student.updateMany({ $rename: { hobbies: "Hobbies" } });
  // const data = await Student.updateMany({}, { $unset: { hobbies: 423421 } });

  // const data = await Student.find({ experience: { $size: 2 } });
  const data = await Student.find({ Hobbies: "Walking" }).count();
  res.json({ data });
});

// orders
apiGet.get("/api/getCompletedOrders", async (req, res) => {
  const completedOrders = await Order.aggregate([
    { $match: { status: "Completed" } },
  ]);
  res.json({ completedOrders });
});
apiGet.get("/api/getCompletedOrdersSales", async (req, res) => {
  const completedOrders = await Order.aggregate([
    { $match: { status: "Completed" } },
    { $group: { _id: "$categoryName", totalPrice: { $sum: "$price" } } },
    { $project: { categoryName: "$_id", totalPrice: 1, _id: 0 } },
    { $sort: { totalPrice: 1 } },
  ]);
  res.json({ completedOrders });
});
//Example : Using $match and $group to find the total sales for each product in a given date range
apiGet.get("/api/sales/get", async (req, res) => {
  const sales = await Sale.aggregate([
    {
      $match: {
        date: { $gte: new Date("2022-01-01"), $lt: new Date("2023-03-01") },
      },
    },
    { $group: { _id: "$product", totalSales: { $sum: "$amount" } } },
    { $project: { productName: "$_id", totalSales: 1, _id: 0 } },
  ]);
  res.json({ sales });
});
//Example : Using $match and $group to find the total sales for each product  current & previous month sales
apiGet.get("/api/sales/get/prevAndCurr", async (req, res) => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const currentMonthSales = await Sale.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(date.getFullYear(), currentMonth, 1),
          $lt: new Date(date.getFullYear(), currentMonth + 1, 1),
        },
      },
    },
    { $group: { _id: "$product", totalSales: { $sum: "$amount" } } },
    { $project: { _id: 0, totalSales: 1, productName: "$_id" } },
  ]);
  const previousMonthSales = await Sale.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(date.getFullYear(), previousMonth, 1),
          $lt: new Date(date.getFullYear(), previousMonth + 1, 1),
        },
      },
    },
    {
      $group: { _id: "$product", totalSales: { $sum: "$amount" } },
    },
    { $project: { _id: 0, totalSales: 1, productName: "$_id" } },
  ]);
  res.json({ currentMonthSales, previousMonthSales });
});

// scores
apiGet.get("/api/scores/students/avg", async (req, res) => {
  const avgScore = await Score.aggregate([
    { $unwind: "$scores" },
    {
      $group: {
        _id: { class: "$classId", student: "$studentId" },
        avgScores: { $avg: "$scores" },
      },
    },
    {
      $project: {
        studentId: "$_id.student",
        classId: "$_id.class",
        _id: 0,
        avgScores: 1,
      },
    },
  ]);
  res.json({ avgScore });
});
// find max avg score of student
apiGet.get("/api/scores/maxValue", async (req, res) => {
  const maxAvgScore = await Score.aggregate([
    { $unwind: "$scores" },
    {
      $group: {
        _id: { class: "$classId", student: "$studentId" },
        avgScores: { $avg: "$scores" },
      },
    },
    {
      $sort: { avgScores: 1 },
    },
    {
      $group: { _id: null, maxValue: { $max: "$avgScores" } },
    },
    {
      $project: { _id: 0, maxValue: 1 },
    },
  ]);
  res.json({ maxAvgScore });
});
module.exports = apiGet;
