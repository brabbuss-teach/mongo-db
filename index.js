const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground") // prod env has different string - will be set in config settings - returns PROMISE
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema); // essentially a Class! PascalCase

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Scott",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save(); // remember it's a promise!
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course
    .find({author: 'Scott', isPublished: true})
    
    .skip((pageNumber - 1) * pageSize)  // allows for pagination with these two fxns
    .limit(pageSize)  // this would be grabbed from the req.params

    .sort({name: 1}) // a => b, -1 is b=> a
    .select({ name: 1, tags: 1}) // what props to return from those objects
  console.log(courses);
}

getCourses();
