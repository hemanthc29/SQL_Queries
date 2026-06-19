// Menu Queries (Tasks 31 - 45)

console.log("\n==================================================");
console.log("RUNNING MENU QUERIES (TASKS 31 - 45)");
console.log("==================================================");

//t31
console.log("\n[Task 31] Display all menu items:");
db.menu.find().forEach(printjson);

//t32
console.log("\n[Task 32] Display menu items costing more than 250:");
db.menu.find({ price: { $gt: 250 } }).forEach(printjson);

//t33
console.log("\n[Task 33] Display menu items costing between 200 and 400:");
db.menu.find({ price: { $gte: 200, $lte: 400 } }).forEach(printjson);

//t34
console.log("\n[Task 34] Display menu items belonging to restaurant ID 101:");
db.menu.find({ restaurant_id: 101 }).forEach(printjson);

//t35
console.log("\n[Task 35] Display menu items whose names start with 'C':");
db.menu.find({ item_name: /^C/ }).forEach(printjson);

//t36
console.log("\n[Task 36] Display menu items whose names contain 'Pizza':");
db.menu.find({ item_name: /Pizza/ }).forEach(printjson);

//t37
console.log("\n[Task 37] Display menu items sorted by price in ascending order:");
db.menu.find().sort({ price: 1 }).forEach(printjson);

//t38
console.log("\n[Task 38] Display the top 3 expensive menu items:");
db.menu.find().sort({ price: -1 }).limit(3).forEach(printjson);

//t39
console.log("\n[Task 39] Display menu items whose prices are less than 300:");
db.menu.find({ price: { $lt: 300 } }).forEach(printjson);

//t40
console.log("\n[Task 40] Display menu items whose prices are not equal to 350:");
db.menu.find({ price: { $ne: 350 } }).forEach(printjson);

//t41
console.log("\n[Task 41] Find the average menu price:");
db.menu.aggregate([
  { $group: { _id: null, average_price: { $avg: "$price" } } }
]).forEach(printjson);

//t42
console.log("\n[Task 42] Find the maximum menu price:");
db.menu.aggregate([
  { $group: { _id: null, max_price: { $max: "$price" } } }
]).forEach(printjson);

//t43
console.log("\n[Task 43] Find the minimum menu price:");
db.menu.aggregate([
  { $group: { _id: null, min_price: { $min: "$price" } } }
]).forEach(printjson);

//t44
console.log("\n[Task 44] Find the total price of all menu items:");
db.menu.aggregate([
  { $group: { _id: null, total_price: { $sum: "$price" } } }
]).forEach(printjson);

//t45
console.log("\n[Task 45] Find the number of menu items available in each restaurant:");
db.menu.aggregate([
  { $group: { _id: "$restaurant_id", menu_item_count: { $sum: 1 } } }
]).forEach(printjson);
