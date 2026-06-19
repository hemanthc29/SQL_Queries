// Restaurants Queries (Tasks 16 - 30)

console.log("\n==================================================");
console.log("RUNNING RESTAURANTS QUERIES (TASKS 16 - 30)");
console.log("==================================================");

//t16
console.log("\n[Task 16] Display all restaurants:");
db.restaurants.find().forEach(printjson);

//t17
console.log("\n[Task 17] Display restaurants located in Bangalore:");
db.restaurants.find({ city: "Bangalore" }).forEach(printjson);

//t18
console.log("\n[Task 18] Display restaurants having rating greater than 4.3:");
db.restaurants.find({ rating: { $gt: 4.3 } }).forEach(printjson);

//t19
console.log("\n[Task 19] Display restaurants having rating between 4.2 and 4.5:");
db.restaurants.find({ rating: { $gte: 4.2, $lte: 4.5 } }).forEach(printjson);

//t20
console.log("\n[Task 20] Display restaurants whose names start with 'P':");
db.restaurants.find({ restaurant_name: /^P/ }).forEach(printjson);

//t21
console.log("\n[Task 21] Display restaurants whose names contain 'King':");
db.restaurants.find({ restaurant_name: /King/ }).forEach(printjson);

//t22
console.log("\n[Task 22] Display restaurants located in Chennai or Hyderabad:");
db.restaurants.find({ $or: [ { city: "Chennai" }, { city: "Hyderabad" } ] }).forEach(printjson);

//t23
console.log("\n[Task 23] Display restaurants not located in Pune:");
db.restaurants.find({ city: { $ne: "Pune" } }).forEach(printjson);

//t24
console.log("\n[Task 24] Display restaurants sorted by rating in descending order:");
db.restaurants.find().sort({ rating: -1 }).forEach(printjson);

//t25
console.log("\n[Task 25] Display the top 3 restaurants based on rating:");
db.restaurants.find().sort({ rating: -1 }).limit(3).forEach(printjson);

//t26
console.log("\n[Task 26] Find the average restaurant rating:");
db.restaurants.aggregate([
  { $group: { _id: null, average_rating: { $avg: "$rating" } } }
]).forEach(printjson);

//t27
console.log("\n[Task 27] Find the highest rating:");
db.restaurants.aggregate([
  { $group: { _id: null, highest_rating: { $max: "$rating" } } }
]).forEach(printjson);

//t28
console.log("\n[Task 28] Find the lowest rating:");
db.restaurants.aggregate([
  { $group: { _id: null, lowest_rating: { $min: "$rating" } } }
]).forEach(printjson);

//t29
console.log("\n[Task 29] Count the number of restaurants in each city:");
db.restaurants.aggregate([
  { $group: { _id: "$city", restaurant_count: { $sum: 1 } } }
]).forEach(printjson);

//t30
console.log("\n[Task 30] Display cities having more than one restaurant:");
db.restaurants.aggregate([
  { $group: { _id: "$city", restaurant_count: { $sum: 1 } } },
  { $match: { restaurant_count: { $gt: 1 } } }
]).forEach(printjson);
