// MongoDB Major Project Orchestrator
// Database Name: food_delivery_db
// Usage: mongosh mongodb_project.js

// 1. Switch to food_delivery_db
db = db.getSiblingDB("food_delivery_db");
console.log("\n==================================================");
console.log("Database Switched to: " + db.getName());
console.log("==================================================");

// 2. Load Sample Data
load("sample_data.js");

// 3. Load and execute all query modules
load("queries/customers.js");
load("queries/restaurants.js");
load("queries/menu.js");
load("queries/orders.js");
load("queries/payments.js");
load("queries/delivery_agents.js");
load("queries/reviews.js");
load("queries/advanced.js");

console.log("\n==================================================");
console.log("ALL 120 PROJECT TASKS COMPLETED SUCCESSFULLY!");
console.log("==================================================");
