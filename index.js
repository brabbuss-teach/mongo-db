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

async function getCourses() {
  return await Course
    .find({tags: 'backend', isPublished: true})
    .sort('name')
    .select('name author')
}

async function run() {
  const courses = await getCourses()
  console.log(courses);
}

run()