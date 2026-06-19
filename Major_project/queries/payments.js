// Payments Queries (Tasks 66 - 85)

console.log("\n==================================================");
console.log("RUNNING PAYMENTS QUERIES (TASKS 66 - 85)");
console.log("==================================================");

// Task 66: Display all payments.
console.log("\n[Task 66] Display all payments:");
db.payments.find().forEach(printjson);

// Task 67: Display successful payments.
console.log("\n[Task 67] Display successful payments:");
db.payments.find({ status: "Success" }).forEach(printjson);

// Task 68: Display pending payments.
console.log("\n[Task 68] Display pending payments:");
db.payments.find({ status: "Pending" }).forEach(printjson);

// Task 69: Display payments made through UPI.
console.log("\n[Task 69] Display payments made through UPI:");
db.payments.find({ payment_method: "UPI" }).forEach(printjson);

// Task 70: Display payments whose amount is greater than 300.
console.log("\n[Task 70] Display payments whose amount is greater than 300:");
db.payments.find({ amount: { $gt: 300 } }).forEach(printjson);

// Task 71: Display payments sorted by amount.
console.log("\n[Task 71] Display payments sorted by amount (ascending):");
db.payments.find().sort({ amount: 1 }).forEach(printjson);

// Task 72: Display top 3 payments.
console.log("\n[Task 72] Display top 3 payments:");
db.payments.find().sort({ amount: -1 }).limit(3).forEach(printjson);

// Task 73: Display payments whose status is not "Success".
console.log("\n[Task 73] Display payments whose status is not 'Success':");
db.payments.find({ status: { $ne: "Success" } }).forEach(printjson);

// Task 74: Display payments made using Cash or UPI.
console.log("\n[Task 74] Display payments made using Cash or UPI:");
db.payments.find({ payment_method: { $in: ["Cash", "UPI"] } }).forEach(printjson);

// Task 75: Display payments whose amount lies between 300 and 500.
console.log("\n[Task 75] Display payments whose amount lies between 300 and 500:");
db.payments.find({ amount: { $gte: 300, $lte: 500 } }).forEach(printjson);

// Task 76: Find the total amount received.
console.log("\n[Task 76] Find the total amount received:");
db.payments.aggregate([
  { $group: { _id: null, total_amount: { $sum: "$amount" } } }
]).forEach(printjson);

// Task 77: Find the average payment amount.
console.log("\n[Task 77] Find the average payment amount:");
db.payments.aggregate([
  { $group: { _id: null, average_amount: { $avg: "$amount" } } }
]).forEach(printjson);

// Task 78: Find the highest payment amount.
console.log("\n[Task 78] Find the highest payment amount:");
db.payments.aggregate([
  { $group: { _id: null, highest_amount: { $max: "$amount" } } }
]).forEach(printjson);

// Task 79: Find the lowest payment amount.
console.log("\n[Task 79] Find the lowest payment amount:");
db.payments.aggregate([
  { $group: { _id: null, lowest_amount: { $min: "$amount" } } }
]).forEach(printjson);

// Task 80: Count payments by payment method.
console.log("\n[Task 80] Count payments by payment method:");
db.payments.aggregate([
  { $group: { _id: "$payment_method", payment_count: { $sum: 1 } } }
]).forEach(printjson);

// Task 81: Count payments by status.
console.log("\n[Task 81] Count payments by status:");
db.payments.aggregate([
  { $group: { _id: "$status", payment_count: { $sum: 1 } } }
]).forEach(printjson);

// Task 82: Display payment methods having more than one transaction.
console.log("\n[Task 82] Display payment methods having more than one transaction:");
db.payments.aggregate([
  { $group: { _id: "$payment_method", payment_count: { $sum: 1 } } },
  { $match: { payment_count: { $gt: 1 } } }
]).forEach(printjson);

// Task 83: Find the total amount received through UPI.
console.log("\n[Task 83] Find the total amount received through UPI:");
db.payments.aggregate([
  { $match: { payment_method: "UPI" } },
  { $group: { _id: null, total_upi_amount: { $sum: "$amount" } } }
]).forEach(printjson);

// Task 84: Find the average amount received through Credit Card.
console.log("\n[Task 84] Find the average amount received through Credit Card:");
db.payments.aggregate([
  { $match: { payment_method: "Credit Card" } },
  { $group: { _id: null, average_cc_amount: { $avg: "$amount" } } }
]).forEach(printjson);

// Task 85: Display payment methods sorted by total transaction amount.
console.log("\n[Task 85] Display payment methods sorted by total transaction amount (descending):");
db.payments.aggregate([
  { $group: { _id: "$payment_method", total_amount: { $sum: "$amount" } } },
  { $sort: { total_amount: -1 } }
]).forEach(printjson);
