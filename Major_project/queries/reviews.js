// Reviews Queries (Tasks 96 - 110)

console.log("\n==================================================");
console.log("RUNNING REVIEWS QUERIES (TASKS 96 - 110)");
console.log("==================================================");

//t96
console.log("\n[Task 96] Display all reviews:");
db.reviews.find().forEach(printjson);

//t97
console.log("\n[Task 97] Display reviews with rating 5:");
db.reviews.find({ rating: 5 }).forEach(printjson);

//t98
console.log("\n[Task 98] Display reviews with rating greater than 4:");
db.reviews.find({ rating: { $gt: 4 } }).forEach(printjson);

//t99
console.log("\n[Task 99] Display reviews given by customer ID 1:");
db.reviews.find({ customer_id: 1 }).forEach(printjson);

//t100
console.log("\n[Task 100] Display reviews sorted by rating (ascending):");
db.reviews.find().sort({ rating: 1 }).forEach(printjson);

//t101
console.log("\n[Task 101] Find the average review rating:");
db.reviews.aggregate([
  { $group: { _id: null, average_rating: { $avg: "$rating" } } }
]).forEach(printjson);

//t102
console.log("\n[Task 102] Find the highest review rating:");
db.reviews.aggregate([
  { $group: { _id: null, highest_rating: { $max: "$rating" } } }
]).forEach(printjson);

//t103
console.log("\n[Task 103] Find the lowest review rating:");
db.reviews.aggregate([
  { $group: { _id: null, lowest_rating: { $min: "$rating" } } }
]).forEach(printjson);

//t104
console.log("\n[Task 104] Count reviews for each restaurant:");
db.reviews.aggregate([
  { $group: { _id: "$restaurant_id", review_count: { $sum: 1 } } }
]).forEach(printjson);

//t105
console.log("\n[Task 105] Display restaurants having more than one review:");
db.reviews.aggregate([
  { $group: { _id: "$restaurant_id", review_count: { $sum: 1 } } },
  { $match: { review_count: { $gt: 1 } } }
]).forEach(printjson);

//t106
console.log("\n[Task 106] Find the average rating for each restaurant:");
db.reviews.aggregate([
  { $group: { _id: "$restaurant_id", average_rating: { $avg: "$rating" } } }
]).forEach(printjson);

//t107
console.log("\n[Task 107] Display restaurants sorted by average rating (ascending):");
db.reviews.aggregate([
  { $group: { _id: "$restaurant_id", average_rating: { $avg: "$rating" } } },
  { $sort: { average_rating: 1 } }
]).forEach(printjson);

//t108
console.log("\n[Task 108] Find the total number of 5-star reviews:");
var totalFiveStar = db.reviews.countDocuments({ rating: 5 });
console.log("Total 5-Star Reviews:", totalFiveStar);

//t109
console.log("\n[Task 109] Count reviews based on rating:");
db.reviews.aggregate([
  { $group: { _id: "$rating", review_count: { $sum: 1 } } }
]).forEach(printjson);

//t110
console.log("\n[Task 110] Display ratings having more than one review:");
db.reviews.aggregate([
  { $group: { _id: "$rating", review_count: { $sum: 1 } } },
  { $match: { review_count: { $gt: 1 } } }
]).forEach(printjson);
