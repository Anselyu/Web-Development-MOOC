

const mongoose = require('mongoose');
const { MongoServerClosedError } = require('mongoose/node_modules/mongodb');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});


const fruitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Why no name?"]
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  review: String
})

const Fruit = mongoose.model("Fruit", fruitsSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 6,
  review: "Not very good"
});

// apple.save();

const personsSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

const Person = mongoose.model("Person", personsSchema);

const person = new Person({
  name: "John",
  age: 36
});

//person.save();


Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(f){
      console.log(f.name);
      
    })
    
  }
});



// const banana = new Fruit({
//   name: "Banana",
//   rating: 10,
//   review: "Greatest fruit ever!"
// });

// const grape = new Fruit({
//   name: "Grapes",
//   rating: 8,
//   review: "Pretty decent"
// });

// const grapefruit = new Fruit({
//   name: "Grapefruit",
//   rating: 1,
//   review: "Terrible"
// });

// Fruit.insertMany([banana, grape, grapefruit], function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Successfully saved fruits to database");
//   }
// })