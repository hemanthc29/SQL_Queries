// Menu Queries (Tasks 31 - 45)

console.log("\n==================================================");
console.log("RUNNING MENU QUERIES (TASKS 31 - 45)");
console.log("==================================================");

// Task 31: Display all menu items.
console.log("\n[Task 31] Display all menu items:");
db.menu.find().forEach(printjson);

// Task 32: Display menu items costing more than 250.
console.log("\n[Task 32] Display menu items costing more than 250:");
db.menu.find({ price: { $gt: 250 } }).forEach(printjson);

// Task 33: Display menu items costing between 200 and 400.
console.log("\n[Task 33] Display menu items costing between 200 and 400:");
db.menu.find({ price: { $gte: 200, $lte: 400 } }).forEach(printjson);

// Task 34: Display menu items belonging to restaurant ID 101.
console.log("\n[Task 34] Display menu items belonging to restaurant ID 101:");
db.menu.find({ restaurant_id: 101 }).forEach(printjson);

// Task 35: Display menu items whose names start with 'C'.
console.log("\n[Task 35] Display menu items whose names start with 'C':");
db.menu.find({ item_name: /^C/ }).forEach(printjson);

// Task 36: Display menu items whose names contain 'Pizza'.
console.log("\n[Task 36] Display menu items whose names contain 'Pizza':");
db.menu.find({ item_name: /Pizza/ }).forEach(printjson);

// Task 37: Display menu items sorted by price in ascending order.
console.log("\n[Task 37] Display menu items sorted by price in ascending order:");
db.menu.find().sort({ price: 1 }).forEach(printjson);

// Task 38: Display the top 3 expensive menu items.
console.log("\n[Task 38] Display the top 3 expensive menu items:");
db.menu.find().sort({ price: -1 }).limit(3).forEach(printjson);

// Task 39: Display menu items whose prices are less than 300.
console.log("\n[Task 39] Display menu items whose prices are less than 300:");
db.menu.find({ price: { $lt: 300 } }).forEach(printjson);

// Task 40: Display menu items whose prices are not equal to 350.
console.log("\n[Task 40] Display menu items whose prices are not equal to 350:");
db.menu.find({ price: { $ne: 350 } }).forEach(printjson);

// Task 41: Find the average menu price.
console.log("\n[Task 41] Find the average menu price:");
db.menu.aggregate([
  { $group: { _id: null, average_price: { $avg: "$price" } } }
]).forEach(printjson);

// Task 42: Find the maximum menu price.
console.log("\n[Task 42] Find the maximum menu price:");
db.menu.aggregate([
  { $group: { _id: null, max_price: { $max: "$price" } } }
]).forEach(printjson);

// Task 43: Find the minimum menu price.
console.log("\n[Task 43] Find the minimum menu price:");
db.menu.aggregate([
  { $group: { _id: null, min_price: { $min: "$price" } } }
]).forEach(printjson);

// Task 44: Find the total price of all menu items.
console.log("\n[Task 44] Find the total price of all menu items:");
db.menu.aggregate([
  { $group: { _id: null, total_price: { $sum: "$price" } } }
]).forEach(printjson);

// Task 45: Find the number of menu items available in each restaurant.
console.log("\n[Task 45] Find the number of menu items available in each restaurant:");
db.menu.aggregate([
  { $group: { _id: "$restaurant_id", menu_item_count: { $sum: 1 } } }
]).forEach(printjson);
