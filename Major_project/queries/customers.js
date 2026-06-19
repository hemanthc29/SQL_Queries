// Customers Queries (Tasks 1 - 15)

console.log("\n==================================================");
console.log("RUNNING CUSTOMERS QUERIES (TASKS 1 - 15)");
console.log("==================================================");

// Task 1: Display all customers.
console.log("\n[Task 1] Display all customers:");
db.customers.find().forEach(printjson);

// Task 2: Display customers from Bangalore.
console.log("\n[Task 2] Display customers from Bangalore:");
db.customers.find({ city: "Bangalore" }).forEach(printjson);

// Task 3: Display customers not belonging to Hyderabad.
console.log("\n[Task 3] Display customers not belonging to Hyderabad:");
db.customers.find({ city: { $ne: "Hyderabad" } }).forEach(printjson);

// Task 4: Display customers whose names start with 'S'.
console.log("\n[Task 4] Display customers whose names start with 'S':");
db.customers.find({ name: /^S/ }).forEach(printjson);

// Task 5: Display customers whose names end with 'a'.
console.log("\n[Task 5] Display customers whose names end with 'a':");
db.customers.find({ name: /a$/ }).forEach(printjson);

// Task 6: Display customers whose names contain 'ar'.
console.log("\n[Task 6] Display customers whose names contain 'ar':");
db.customers.find({ name: /ar/ }).forEach(printjson);

// Task 7: Display customers from Bangalore or Chennai.
console.log("\n[Task 7] Display customers from Bangalore or Chennai:");
db.customers.find({ $or: [ { city: "Bangalore" }, { city: "Chennai" } ] }).forEach(printjson);

// Task 8: Display customers from Bangalore and whose name starts with 'A'.
console.log("\n[Task 8] Display customers from Bangalore and whose name starts with 'A':");
db.customers.find({ city: "Bangalore", name: /^A/ }).forEach(printjson);

// Task 9: Display customers whose city is in Bangalore, Hyderabad, or Pune.
console.log("\n[Task 9] Display customers whose city is in Bangalore, Hyderabad, or Pune:");
db.customers.find({ city: { $in: ["Bangalore", "Hyderabad", "Pune"] } }).forEach(printjson);

// Task 10: Display customers sorted by name.
console.log("\n[Task 10] Display customers sorted by name (ascending):");
db.customers.find().sort({ name: 1 }).forEach(printjson);

// Task 11: Count the total number of customers.
console.log("\n[Task 11] Count the total number of customers:");
var totalCustomers = db.customers.countDocuments();
console.log("Total Customers:", totalCustomers);

// Task 12: Find the number of customers in each city.
console.log("\n[Task 12] Find the number of customers in each city:");
db.customers.aggregate([
  { $group: { _id: "$city", customer_count: { $sum: 1 } } }
]).forEach(printjson);

// Task 13: Find the city having the maximum number of customers.
console.log("\n[Task 13] Find the city having the maximum number of customers:");
db.customers.aggregate([
  { $group: { _id: "$city", customer_count: { $sum: 1 } } },
  { $sort: { customer_count: -1 } },
  { $limit: 1 }
]).forEach(printjson);

// Task 14: Display cities having more than one customer.
console.log("\n[Task 14] Display cities having more than one customer:");
db.customers.aggregate([
  { $group: { _id: "$city", customer_count: { $sum: 1 } } },
  { $match: { customer_count: { $gt: 1 } } }
]).forEach(printjson);

// Task 15: Sort cities by customer count.
console.log("\n[Task 15] Sort cities by customer count (ascending):");
db.customers.aggregate([
  { $group: { _id: "$city", customer_count: { $sum: 1 } } },
  { $sort: { customer_count: 1 } }
]).forEach(printjson);
