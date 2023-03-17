const express = require("express");
const apiGet = express.Router();
const Teacher = require("../../models/teachers");
const Student = require("../../models/students");
const Employee = require("../../models/employee");

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
module.exports = apiGet;
