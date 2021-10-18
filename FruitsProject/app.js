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
  favouriteFruit: fruitsSchema
})

const Person = mongoose.model("Person", personsSchema);

const banana = new Fruit({
  name: "Banana",
  rating: 10,
  review: "Greatest fruit ever!"
});

const chicken = new Fruit({
  name: "Chicken",
  rating: 0,
  review: "Not a fruit"
});


const carl = new Person({
  name: "Carl",
  age: 17,
  favouriteFruit: banana
});

// carl.save();

Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  } else {
    fruits.forEach(function(f){
      console.log(f);
    })
  }
});
Person.find(function(err, people){
  if (err){
    console.log(err);
  } else {
    people.forEach(function(p){
      console.log(p);
    })
  }
});

Person.updateOne({name: "John"}, {favouriteFruit: chicken}, function(err){
  if (err){
    console.log(err);
  } else {
    console.log ("Successfuly updated");
  }
})

// Fruit.deleteMany({_id:["616d1793a19409607e41f97c", "616d1793a19409607e41f97b", "616d1793a19409607e41f97a"]}, function(err){
//   if (err) {
//     console.log (err);
//   } else {
//     console.log("Item successfully deleted");
//   }
// });

// const person = new Person({
//   name: "John",
//   age: 36
// });

//person.save();

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