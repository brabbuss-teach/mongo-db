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

// mongoose.model() - 2 args,
// 1 - singular name of the collection this model is for
// 2 - schema that defines the shape of docs in this collection
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
  // const courses = await Course.find() // return all

  // eq equal
  // ne not equal
  // gt greater than
  // gte greater than or equal to
  // lt less than
  // lte less than or equal to
  // in
  // nin not in
  // or
  // and

  const courses = await Course
    // .find({author: 'Scott', isPublished: true}) // filter with arg object
    // .find({price: { $gte: 10, $lte: 20 } })
    // .find({price: {$in: [10, 15, 20]}})  // returns obj w/price === 10, 15, or 20
    
    // .find()
    // .or([{author: 'Scott'}, {isPublished: true}]) // array of filter objects
    // .and([]) // array of filter objects
    
    //            REGEX
    // /^string/ - finds all string that start with Scott
    .find({ author: /^Scott/ }) 
    // /pattern$/ - finds strings that end in Brabson - 'i' means case INsensitive
    .find({ author: /Brabson$/i }) 
    // contains Scott
    .find({ author: /.*Scott.*/i }) // can have 0 or more characters before or at the end of 'scott'

    .limit(10)
    .sort({name: 1}) // a => b, -1 is b=> a
    .select({ name: 1, tags: 1}) // what props to return from those objects
  console.log(courses);
}

getCourses();
