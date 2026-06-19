// Advanced Project-Level Aggregation Tasks (Tasks 111 - 119)

console.log("\n==================================================");
console.log("RUNNING ADVANCED AGGREGATION QUERIES (TASKS 111 - 119)");
console.log("==================================================");

// Task 111: Find the restaurant generating the highest revenue.
console.log("\n[Task 111] Find the restaurant generating the highest revenue:");
db.orders.aggregate([
  { $group: { _id: "$restaurant_id", total_revenue: { $sum: "$total_amount" } } },
  { $sort: { total_revenue: -1 } },
  { $limit: 1 },
  { $lookup: {
      from: "restaurants",
      localField: "_id",
      foreignField: "restaurant_id",
      as: "restaurant_details"
    }
  },
  { $unwind: "$restaurant_details" },
  { $project: {
      restaurant_id: "$_id",
      restaurant_name: "$restaurant_details.restaurant_name",
      total_revenue: 1,
      _id: 0
    }
  }
]).forEach(printjson);

// Task 112: Find the customer who placed the maximum number of orders.
console.log("\n[Task 112] Find the customer who placed the maximum number of orders:");
db.orders.aggregate([
  { $group: { _id: "$customer_id", order_count: { $sum: 1 } } },
  { $sort: { order_count: -1 } },
  { $limit: 1 },
  { $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer_details"
    }
  },
  { $unwind: "$customer_details" },
  { $project: {
      customer_id: "$_id",
      customer_name: "$customer_details.name",
      order_count: 1,
      _id: 0
    }
  }
]).forEach(printjson);

// Task 113: Find the most popular payment method.
console.log("\n[Task 113] Find the most popular payment method:");
db.payments.aggregate([
  { $group: { _id: "$payment_method", transaction_count: { $sum: 1 } } },
  { $sort: { transaction_count: -1 } },
  { $limit: 1 },
  { $project: {
      payment_method: "$_id",
      transaction_count: 1,
      _id: 0
    }
  }
]).forEach(printjson);

// Task 114: Find the city with the maximum customers.
console.log("\n[Task 114] Find the city with the maximum customers:");
db.customers.aggregate([
  { $group: { _id: "$city", customer_count: { $sum: 1 } } },
  { $sort: { customer_count: -1 } },
  { $limit: 1 },
  { $project: {
      city: "$_id",
      customer_count: 1,
      _id: 0
    }
  }
]).forEach(printjson);

// Task 115: Find the city having the highest number of restaurants.
console.log("\n[Task 115] Find the city having the highest number of restaurants:");
db.restaurants.aggregate([
  { $group: { _id: "$city", restaurant_count: { $sum: 1 } } },
  { $sort: { restaurant_count: -1 } },
  { $limit: 1 },
  { $project: {
      city: "$_id",
      restaurant_count: 1,
      _id: 0
    }
  }
]).forEach(printjson);

// Task 116: Find the top 3 restaurants based on average ratings.
console.log("\n[Task 116] Find the top 3 restaurants based on average ratings (calculated from reviews):");
db.reviews.aggregate([
  { $group: { _id: "$restaurant_id", average_rating: { $avg: "$rating" } } },
  { $sort: { average_rating: -1 } },
  { $limit: 3 },
  { $lookup: {
      from: "restaurants",
      localField: "_id",
      foreignField: "restaurant_id",
      as: "restaurant_details"
    }
  },
  { $unwind: "$restaurant_details" },
  { $project: {
      restaurant_id: "$_id",
      restaurant_name: "$restaurant_details.restaurant_name",
      average_rating: 1,
      _id: 0
    }
  }
]).forEach(printjson);

// Task 117: Find the top 5 customers based on order count.
console.log("\n[Task 117] Find the top 5 customers based on order count:");
db.orders.aggregate([
  { $group: { _id: "$customer_id", order_count: { $sum: 1 } } },
  { $sort: { order_count: -1 } },
  { $limit: 5 },
  { $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer_details"
    }
  },
  { $unwind: "$customer_details" },
  { $project: {
      customer_id: "$_id",
      customer_name: "$customer_details.name",
      order_count: 1,
      _id: 0
    }
  }
]).forEach(printjson);

// Task 118: Find the percentage of delivered orders.
console.log("\n[Task 118] Find the percentage of delivered orders:");
db.orders.aggregate([
  { $group: {
      _id: null,
      total_orders: { $sum: 1 },
      delivered_orders: {
        $sum: { $cond: [ { $eq: ["$status", "Delivered"] }, 1, 0 ] }
      }
    }
  },
  { $project: {
      total_orders: 1,
      delivered_orders: 1,
      delivered_percentage: {
        $multiply: [ { $divide: ["$delivered_orders", "$total_orders"] }, 100 ]
      },
      _id: 0
    }
  }
]).forEach(printjson);

// Task 119: Find the average order amount city-wise.
console.log("\n[Task 119] Find the average order amount city-wise:");
db.orders.aggregate([
  { $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer_details"
    }
  },
  { $unwind: "$customer_details" },
  { $group: { _id: "$customer_details.city", average_order_amount: { $avg: "$total_amount" } } },
  { $project: {
      city: "$_id",
      average_order_amount: 1,
      _id: 0
    }
  }
]).forEach(printjson);
