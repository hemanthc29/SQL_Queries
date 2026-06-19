// Delivery Agents Queries (Tasks 86 - 95)

console.log("\n==================================================");
console.log("RUNNING DELIVERY AGENTS QUERIES (TASKS 86 - 95)");
console.log("==================================================");

// Task 86: Display all delivery agents.
console.log("\n[Task 86] Display all delivery agents:");
db.delivery_agents.find().forEach(printjson);

// Task 87: Display delivery agents from Bangalore.
console.log("\n[Task 87] Display delivery agents from Bangalore:");
db.delivery_agents.find({ city: "Bangalore" }).forEach(printjson);

// Task 88: Display agents having rating greater than 4.7.
console.log("\n[Task 88] Display agents having rating greater than 4.7:");
db.delivery_agents.find({ rating: { $gt: 4.7 } }).forEach(printjson);

// Task 89: Display agents whose names start with 'A'.
console.log("\n[Task 89] Display agents whose names start with 'A':");
db.delivery_agents.find({ agent_name: /^A/ }).forEach(printjson);

// Task 90: Display agents sorted by rating.
console.log("\n[Task 90] Display agents sorted by rating (ascending):");
db.delivery_agents.find().sort({ rating: 1 }).forEach(printjson);

// Task 91: Find the average agent rating.
console.log("\n[Task 91] Find the average agent rating:");
db.delivery_agents.aggregate([
  { $group: { _id: null, average_rating: { $avg: "$rating" } } }
]).forEach(printjson);

// Task 92: Find the highest rating.
console.log("\n[Task 92] Find the highest rating:");
db.delivery_agents.aggregate([
  { $group: { _id: null, highest_rating: { $max: "$rating" } } }
]).forEach(printjson);

// Task 93: Find the lowest rating.
console.log("\n[Task 93] Find the lowest rating:");
db.delivery_agents.aggregate([
  { $group: { _id: null, lowest_rating: { $min: "$rating" } } }
]).forEach(printjson);

// Task 94: Count agents city-wise.
console.log("\n[Task 94] Count agents city-wise:");
db.delivery_agents.aggregate([
  { $group: { _id: "$city", agent_count: { $sum: 1 } } }
]).forEach(printjson);

// Task 95: Display cities having more than one agent.
console.log("\n[Task 95] Display cities having more than one agent:");
db.delivery_agents.aggregate([
  { $group: { _id: "$city", agent_count: { $sum: 1 } } },
  { $match: { agent_count: { $gt: 1 } } }
]).forEach(printjson);
