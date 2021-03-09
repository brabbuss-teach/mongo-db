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
  const courses = await Course
    .find({tags:{$in:'backend'}})
    .sort({name:1})
    .select({name: 1, author: 1})
  console.log(courses)
}

getCourses()