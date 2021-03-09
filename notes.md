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
    // .find({ author: /^Scott/ }) 
    // /pattern$/ - finds strings that end in Brabson - 'i' means case INsensitive
    // .find({ author: /Brabson$/i }) 
    // contains Scott
    // .find({ author: /.*Scott.*/i }) // can have 0 or more characters before or at the end of 'scott'

    .limit(10)
    .sort({name: 1}) // a => b, -1 is b=> a
    .select({ name: 1, tags: 1}) // what props to return from those objects
    
    // .count()  // will return # of items that match filter criteria 
    .skip()
  console.log(courses);
}
