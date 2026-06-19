// Orders Queries (Tasks 46 - 65)

console.log("\n==================================================");
console.log("RUNNING ORDERS QUERIES (TASKS 46 - 65)");
console.log("==================================================");

//t46
console.log("\n[Task 46] Display all orders:");
db.orders.find().forEach(printjson);

//t47
console.log("\n[Task 47] Display delivered orders:");
db.orders.find({ status: "Delivered" }).forEach(printjson);

//t48
console.log("\n[Task 48] Display pending orders:");
db.orders.find({ status: "Pending" }).forEach(printjson);

//t49
console.log("\n[Task 49] Display orders having total amount greater than 400:");
db.orders.find({ total_amount: { $gt: 400 } }).forEach(printjson);

//t50
console.log("\n[Task 50] Display orders having total amount between 300 and 600:");
db.orders.find({ total_amount: { $gte: 300, $lte: 600 } }).forEach(printjson);

//t51
console.log("\n[Task 51] Display orders placed by customer ID 1:");
db.orders.find({ customer_id: 1 }).forEach(printjson);

//t52
console.log("\n[Task 52] Display orders sorted by amount in descending order:");
db.orders.find().sort({ total_amount: -1 }).forEach(printjson);

//t53
console.log("\n[Task 53] Display the top 3 highest orders:");
db.orders.find().sort({ total_amount: -1 }).limit(3).forEach(printjson);

//t54
console.log("\n[Task 54] Display orders whose status is not 'Delivered':");
db.orders.find({ status: { $ne: "Delivered" } }).forEach(printjson);

//t55
console.log("\n[Task 55] Display orders having amount greater than 300 and status 'Delivered':");
db.orders.find({ total_amount: { $gt: 300 }, status: "Delivered" }).forEach(printjson);

//t56
console.log("\n[Task 56] Find total revenue generated:");
db.orders.aggregate([
  { $group: { _id: null, total_revenue: { $sum: "$total_amount" } } }
]).forEach(printjson);

//t57
console.log("\n[Task 57] Find average order amount:");
db.orders.aggregate([
  { $group: { _id: null, average_amount: { $avg: "$total_amount" } } }
]).forEach(printjson);

//t58
console.log("\n[Task 58] Find highest order amount:");
db.orders.aggregate([
  { $group: { _id: null, highest_amount: { $max: "$total_amount" } } }
]).forEach(printjson);

//t59
console.log("\n[Task 59] Find lowest order amount:");
db.orders.aggregate([
  { $group: { _id: null, lowest_amount: { $min: "$total_amount" } } }
]).forEach(printjson);

//t60
console.log("\n[Task 60] Count orders based on status:");
db.orders.aggregate([
  { $group: { _id: "$status", order_count: { $sum: 1 } } }
]).forEach(printjson);

//t61
console.log("\n[Task 61] Display statuses having more than one order:");
db.orders.aggregate([
  { $group: { _id: "$status", order_count: { $sum: 1 } } },
  { $match: { order_count: { $gt: 1 } } }
]).forEach(printjson);

//t62
console.log("\n[Task 62] Display order statuses sorted by order count (ascending):");
db.orders.aggregate([
  { $group: { _id: "$status", order_count: { $sum: 1 } } },
  { $sort: { order_count: 1 } }
]).forEach(printjson);

//t63
console.log("\n[Task 63] Find the total revenue generated from delivered orders:");
db.orders.aggregate([
  { $match: { status: "Delivered" } },
  { $group: { _id: null, total_delivered_revenue: { $sum: "$total_amount" } } }
]).forEach(printjson);

//t64
console.log("\n[Task 64] Find the average amount of delivered orders:");
db.orders.aggregate([
  { $match: { status: "Delivered" } },
  { $group: { _id: null, average_delivered_amount: { $avg: "$total_amount" } } }
]).forEach(printjson);

//t65
console.log("\n[Task 65] Find the number of orders placed by each customer:");
db.orders.aggregate([
  { $group: { _id: "$customer_id", order_count: { $sum: 1 } } }
]).forEach(printjson);
