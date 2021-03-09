const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/mongo-exercises')
  .then(console.log('Connected to MongoDB...'))
  .catch(err => console.log("Couldn't connect to MongoDB...", err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
  tags: [String],
  date: {type: Date, default: Date.now},
})

const Course = mongoose.model("Course", courseSchema)

async function getBackendCourses() {
  return await Course
    .find({tags: 'backend', isPublished: true})
    .sort('name')
    .select('name author')
}

async function getAllCourses() {
  return await Course
    // .find({isPublished: true, tags: { $in: ['frontend', 'backend']}}) // on a single line or two lines with 'or' below
    .find({isPublished: true})
    .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort('-price')
    .select('name author price')
}

async function run() {
  const backendCourses = await getBackendCourses()
  const allCourses = await getAllCourses()
 
  console.log("All Courses", allCourses);
  console.log("Backend Courses", backendCourses);
}

run()