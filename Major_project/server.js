const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'food_delivery_db';

let db;
let client;

// Connect to MongoDB
async function connectDB() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`Connected to MongoDB at ${MONGO_URI}, using database: ${DB_NAME}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
}

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample data definition for seeding
const sampleData = {
  customers: [
    { customer_id: 1, name: "Saran", email: "saran@gmail.com", phone: "9876543210", city: "Bangalore" },
    { customer_id: 2, name: "Priya", email: "priya@gmail.com", phone: "9876543211", city: "Hyderabad" },
    { customer_id: 3, name: "Rahul", email: "rahul@gmail.com", phone: "9876543212", city: "Chennai" },
    { customer_id: 4, name: "Deepa", email: "deepa@gmail.com", phone: "9876543213", city: "Pune" },
    { customer_id: 5, name: "Anjali", email: "anjali@gmail.com", phone: "9876543214", city: "Bangalore" }
  ],
  restaurants: [
    { restaurant_id: 101, restaurant_name: "Pizza Hut", city: "Bangalore", rating: 4.5 },
    { restaurant_id: 102, restaurant_name: "Dominos", city: "Hyderabad", rating: 4.3 },
    { restaurant_id: 103, restaurant_name: "Burger King", city: "Chennai", rating: 4.4 },
    { restaurant_id: 104, restaurant_name: "KFC", city: "Pune", rating: 4.2 }
  ],
  menu: [
    { item_id: 1, restaurant_id: 101, item_name: "Veg Pizza", price: 250 },
    { item_id: 2, restaurant_id: 101, item_name: "Chicken Pizza", price: 350 },
    { item_id: 3, restaurant_id: 102, item_name: "Cheese Burst Pizza", price: 300 },
    { item_id: 4, restaurant_id: 103, item_name: "Veg Burger", price: 180 },
    { item_id: 5, restaurant_id: 104, item_name: "Chicken Bucket", price: 550 }
  ],
  orders: [
    { order_id: 1001, customer_id: 1, restaurant_id: 101, items: [{ item_name: "Veg Pizza", quantity: 2, price: 250 }], total_amount: 500, status: "Delivered" },
    { order_id: 1002, customer_id: 2, restaurant_id: 102, items: [{ item_name: "Cheese Burst Pizza", quantity: 1, price: 300 }], total_amount: 300, status: "Pending" },
    { order_id: 1003, customer_id: 3, restaurant_id: 103, items: [{ item_name: "Veg Burger", quantity: 2, price: 180 }], total_amount: 360, status: "Delivered" }
  ],
  payments: [
    { payment_id: 501, order_id: 1001, payment_method: "UPI", amount: 500, status: "Success" },
    { payment_id: 502, order_id: 1002, payment_method: "Credit Card", amount: 300, status: "Pending" },
    { payment_id: 503, order_id: 1003, payment_method: "Cash", amount: 360, status: "Success" }
  ],
  delivery_agents: [
    { agent_id: 1, agent_name: "Kumar", city: "Bangalore", rating: 4.8 },
    { agent_id: 2, agent_name: "Arjun", city: "Hyderabad", rating: 4.6 },
    { agent_id: 3, agent_name: "Sneha", city: "Chennai", rating: 4.9 }
  ],
  reviews: [
    { review_id: 1, customer_id: 1, restaurant_id: 101, rating: 5, comment: "Excellent service" },
    { review_id: 2, customer_id: 2, restaurant_id: 102, rating: 4, comment: "Good taste" },
    { review_id: 3, customer_id: 3, restaurant_id: 103, rating: 5, comment: "Very tasty" }
  ]
};

// Seed endpoint
app.post('/api/seed', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Database not initialized' });
  try {
    for (const [colName, docs] of Object.entries(sampleData)) {
      await db.collection(colName).deleteMany({});
      await db.collection(colName).insertMany(docs);
    }
    res.json({ message: 'Database successfully seeded with fresh sample data!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check MongoDB connection status
app.get('/api/status', (req, res) => {
  res.json({ connected: !!db, database: DB_NAME, url: MONGO_URI });
});

// Map task query strings and runner functions
const tasks = {};

// Register tasks dynamically
function registerTask(id, category, title, queryStr, runner) {
  tasks[id] = { id, category, title, queryStr, runner };
}

// Customers
registerTask(1, "Customers", "Display all customers", "db.customers.find({})", db => db.collection('customers').find({}).toArray());
registerTask(2, "Customers", "Display customers from Bangalore", "db.customers.find({ city: 'Bangalore' })", db => db.collection('customers').find({ city: 'Bangalore' }).toArray());
registerTask(3, "Customers", "Display customers not belonging to Hyderabad", "db.customers.find({ city: { $ne: 'Hyderabad' } })", db => db.collection('customers').find({ city: { $ne: 'Hyderabad' } }).toArray());
registerTask(4, "Customers", "Display customers whose names start with 'S'", "db.customers.find({ name: /^S/ })", db => db.collection('customers').find({ name: /^S/ }).toArray());
registerTask(5, "Customers", "Display customers whose names end with 'a'", "db.customers.find({ name: /a$/ })", db => db.collection('customers').find({ name: /a$/ }).toArray());
registerTask(6, "Customers", "Display customers whose names contain 'ar'", "db.customers.find({ name: /ar/ })", db => db.collection('customers').find({ name: /ar/ }).toArray());
registerTask(7, "Customers", "Display customers from Bangalore or Chennai", "db.customers.find({ $or: [ { city: 'Bangalore' }, { city: 'Chennai' } ] })", db => db.collection('customers').find({ $or: [ { city: 'Bangalore' }, { city: 'Chennai' } ] }).toArray());
registerTask(8, "Customers", "Display customers from Bangalore and whose name starts with 'A'", "db.customers.find({ city: 'Bangalore', name: /^A/ })", db => db.collection('customers').find({ city: 'Bangalore', name: /^A/ }).toArray());
registerTask(9, "Customers", "Display customers whose city is in Bangalore, Hyderabad, or Pune", "db.customers.find({ city: { $in: ['Bangalore', 'Hyderabad', 'Pune'] } })", db => db.collection('customers').find({ city: { $in: ['Bangalore', 'Hyderabad', 'Pune'] } }).toArray());
registerTask(10, "Customers", "Display customers sorted by name", "db.customers.find({}).sort({ name: 1 })", db => db.collection('customers').find({}).sort({ name: 1 }).toArray());
registerTask(11, "Customers", "Count the total number of customers", "db.customers.countDocuments({})", async db => ({ total_customers: await db.collection('customers').countDocuments({}) }));
registerTask(12, "Customers", "Find the number of customers in each city", "db.customers.aggregate([\n  { $group: { _id: '$city', customer_count: { $sum: 1 } } }\n])", db => db.collection('customers').aggregate([{ $group: { _id: '$city', customer_count: { $sum: 1 } } }]).toArray());
registerTask(13, "Customers", "Find the city having the maximum number of customers", "db.customers.aggregate([\n  { $group: { _id: '$city', customer_count: { $sum: 1 } } },\n  { $sort: { customer_count: -1 } },\n  { $limit: 1 }\n])", db => db.collection('customers').aggregate([{ $group: { _id: '$city', customer_count: { $sum: 1 } } }, { $sort: { customer_count: -1 } }, { $limit: 1 }]).toArray());
registerTask(14, "Customers", "Display cities having more than one customer", "db.customers.aggregate([\n  { $group: { _id: '$city', customer_count: { $sum: 1 } } },\n  { $match: { customer_count: { $gt: 1 } } }\n])", db => db.collection('customers').aggregate([{ $group: { _id: '$city', customer_count: { $sum: 1 } } }, { $match: { customer_count: { $gt: 1 } } }]).toArray());
registerTask(15, "Customers", "Sort cities by customer count", "db.customers.aggregate([\n  { $group: { _id: '$city', customer_count: { $sum: 1 } } },\n  { $sort: { customer_count: 1 } }\n])", db => db.collection('customers').aggregate([{ $group: { _id: '$city', customer_count: { $sum: 1 } } }, { $sort: { customer_count: 1 } }]).toArray());

// Restaurants
registerTask(16, "Restaurants", "Display all restaurants", "db.restaurants.find({})", db => db.collection('restaurants').find({}).toArray());
registerTask(17, "Restaurants", "Display restaurants located in Bangalore", "db.restaurants.find({ city: 'Bangalore' })", db => db.collection('restaurants').find({ city: 'Bangalore' }).toArray());
registerTask(18, "Restaurants", "Display restaurants having rating greater than 4.3", "db.restaurants.find({ rating: { $gt: 4.3 } })", db => db.collection('restaurants').find({ rating: { $gt: 4.3 } }).toArray());
registerTask(19, "Restaurants", "Display restaurants having rating between 4.2 and 4.5", "db.restaurants.find({ rating: { $gte: 4.2, $lte: 4.5 } })", db => db.collection('restaurants').find({ rating: { $gte: 4.2, $lte: 4.5 } }).toArray());
registerTask(20, "Restaurants", "Display restaurants whose names start with 'P'", "db.restaurants.find({ restaurant_name: /^P/ })", db => db.collection('restaurants').find({ restaurant_name: /^P/ }).toArray());
registerTask(21, "Restaurants", "Display restaurants whose names contain 'King'", "db.restaurants.find({ restaurant_name: /King/ })", db => db.collection('restaurants').find({ restaurant_name: /King/ }).toArray());
registerTask(22, "Restaurants", "Display restaurants located in Chennai or Hyderabad", "db.restaurants.find({ $or: [ { city: 'Chennai' }, { city: 'Hyderabad' } ] })", db => db.collection('restaurants').find({ $or: [ { city: 'Chennai' }, { city: 'Hyderabad' } ] }).toArray());
registerTask(23, "Restaurants", "Display restaurants not located in Pune", "db.restaurants.find({ city: { $ne: 'Pune' } })", db => db.collection('restaurants').find({ city: { $ne: 'Pune' } }).toArray());
registerTask(24, "Restaurants", "Display restaurants sorted by rating in descending order", "db.restaurants.find({}).sort({ rating: -1 })", db => db.collection('restaurants').find({}).sort({ rating: -1 }).toArray());
registerTask(25, "Restaurants", "Display the top 3 restaurants based on rating", "db.restaurants.find({}).sort({ rating: -1 }).limit(3)", db => db.collection('restaurants').find({}).sort({ rating: -1 }).limit(3).toArray());
registerTask(26, "Restaurants", "Find the average restaurant rating", "db.restaurants.aggregate([\n  { $group: { _id: null, average_rating: { $avg: '$rating' } } }\n])", db => db.collection('restaurants').aggregate([{ $group: { _id: null, average_rating: { $avg: '$rating' } } }]).toArray());
registerTask(27, "Restaurants", "Find the highest rating", "db.restaurants.aggregate([\n  { $group: { _id: null, highest_rating: { $max: '$rating' } } }\n])", db => db.collection('restaurants').aggregate([{ $group: { _id: null, highest_rating: { $max: '$rating' } } }]).toArray());
registerTask(28, "Restaurants", "Find the lowest rating", "db.restaurants.aggregate([\n  { $group: { _id: null, lowest_rating: { $min: '$rating' } } }\n])", db => db.collection('restaurants').aggregate([{ $group: { _id: null, lowest_rating: { $min: '$rating' } } }]).toArray());
registerTask(29, "Restaurants", "Count the number of restaurants in each city", "db.restaurants.aggregate([\n  { $group: { _id: '$city', restaurant_count: { $sum: 1 } } }\n])", db => db.collection('restaurants').aggregate([{ $group: { _id: '$city', restaurant_count: { $sum: 1 } } }]).toArray());
registerTask(30, "Restaurants", "Display cities having more than one restaurant", "db.restaurants.aggregate([\n  { $group: { _id: '$city', restaurant_count: { $sum: 1 } } },\n  { $match: { restaurant_count: { $gt: 1 } } }\n])", db => db.collection('restaurants').aggregate([{ $group: { _id: '$city', restaurant_count: { $sum: 1 } } }, { $match: { restaurant_count: { $gt: 1 } } }]).toArray());

// Menu
registerTask(31, "Menu", "Display all menu items", "db.menu.find({})", db => db.collection('menu').find({}).toArray());
registerTask(32, "Menu", "Display menu items costing more than 250", "db.menu.find({ price: { $gt: 250 } })", db => db.collection('menu').find({ price: { $gt: 250 } }).toArray());
registerTask(33, "Menu", "Display menu items costing between 200 and 400", "db.menu.find({ price: { $gte: 200, $lte: 400 } })", db => db.collection('menu').find({ price: { $gte: 200, $lte: 400 } }).toArray());
registerTask(34, "Menu", "Display menu items belonging to restaurant ID 101", "db.menu.find({ restaurant_id: 101 })", db => db.collection('menu').find({ restaurant_id: 101 }).toArray());
registerTask(35, "Menu", "Display menu items whose names start with 'C'", "db.menu.find({ item_name: /^C/ })", db => db.collection('menu').find({ item_name: /^C/ }).toArray());
registerTask(36, "Menu", "Display menu items whose names contain 'Pizza'", "db.menu.find({ item_name: /Pizza/ })", db => db.collection('menu').find({ item_name: /Pizza/ }).toArray());
registerTask(37, "Menu", "Display menu items sorted by price in ascending order", "db.menu.find({}).sort({ price: 1 })", db => db.collection('menu').find({}).sort({ price: 1 }).toArray());
registerTask(38, "Menu", "Display the top 3 expensive menu items", "db.menu.find({}).sort({ price: -1 }).limit(3)", db => db.collection('menu').find({}).sort({ price: -1 }).limit(3).toArray());
registerTask(39, "Menu", "Display menu items whose prices are less than 300", "db.menu.find({ price: { $lt: 300 } })", db => db.collection('menu').find({ price: { $lt: 300 } }).toArray());
registerTask(40, "Menu", "Display menu items whose prices are not equal to 350", "db.menu.find({ price: { $ne: 350 } })", db => db.collection('menu').find({ price: { $ne: 350 } }).toArray());
registerTask(41, "Menu", "Find the average menu price", "db.menu.aggregate([\n  { $group: { _id: null, average_price: { $avg: '$price' } } }\n])", db => db.collection('menu').aggregate([{ $group: { _id: null, average_price: { $avg: '$price' } } }]).toArray());
registerTask(42, "Menu", "Find the maximum menu price", "db.menu.aggregate([\n  { $group: { _id: null, max_price: { $max: '$price' } } }\n])", db => db.collection('menu').aggregate([{ $group: { _id: null, max_price: { $max: '$price' } } }]).toArray());
registerTask(43, "Menu", "Find the minimum menu price", "db.menu.aggregate([\n  { $group: { _id: null, min_price: { $min: '$price' } } }\n])", db => db.collection('menu').aggregate([{ $group: { _id: null, min_price: { $min: '$price' } } }]).toArray());
registerTask(44, "Menu", "Find the total price of all menu items", "db.menu.aggregate([\n  { $group: { _id: null, total_price: { $sum: '$price' } } }\n])", db => db.collection('menu').aggregate([{ $group: { _id: null, total_price: { $sum: '$price' } } }]).toArray());
registerTask(45, "Menu", "Find the number of menu items available in each restaurant", "db.menu.aggregate([\n  { $group: { _id: '$restaurant_id', menu_item_count: { $sum: 1 } } }\n])", db => db.collection('menu').aggregate([{ $group: { _id: '$restaurant_id', menu_item_count: { $sum: 1 } } }]).toArray());

// Orders
registerTask(46, "Orders", "Display all orders", "db.orders.find({})", db => db.collection('orders').find({}).toArray());
registerTask(47, "Orders", "Display delivered orders", "db.orders.find({ status: 'Delivered' })", db => db.collection('orders').find({ status: 'Delivered' }).toArray());
registerTask(48, "Orders", "Display pending orders", "db.orders.find({ status: 'Pending' })", db => db.collection('orders').find({ status: 'Pending' }).toArray());
registerTask(49, "Orders", "Display orders having total amount greater than 400", "db.orders.find({ total_amount: { $gt: 400 } })", db => db.collection('orders').find({ total_amount: { $gt: 400 } }).toArray());
registerTask(50, "Orders", "Display orders having total amount between 300 and 600", "db.orders.find({ total_amount: { $gte: 300, $lte: 600 } })", db => db.collection('orders').find({ total_amount: { $gte: 300, $lte: 600 } }).toArray());
registerTask(51, "Orders", "Display orders placed by customer ID 1", "db.orders.find({ customer_id: 1 })", db => db.collection('orders').find({ customer_id: 1 }).toArray());
registerTask(52, "Orders", "Display orders sorted by amount in descending order", "db.orders.find({}).sort({ total_amount: -1 })", db => db.collection('orders').find({}).sort({ total_amount: -1 }).toArray());
registerTask(53, "Orders", "Display the top 3 highest orders", "db.orders.find({}).sort({ total_amount: -1 }).limit(3)", db => db.collection('orders').find({}).sort({ total_amount: -1 }).limit(3).toArray());
registerTask(54, "Orders", "Display orders whose status is not 'Delivered'", "db.orders.find({ status: { $ne: 'Delivered' } })", db => db.collection('orders').find({ status: { $ne: 'Delivered' } }).toArray());
registerTask(55, "Orders", "Display orders having amount greater than 300 and status 'Delivered'", "db.orders.find({ total_amount: { $gt: 300 }, status: 'Delivered' })", db => db.collection('orders').find({ total_amount: { $gt: 300 }, status: 'Delivered' }).toArray());
registerTask(56, "Orders", "Find total revenue generated", "db.orders.aggregate([\n  { $group: { _id: null, total_revenue: { $sum: '$total_amount' } } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: null, total_revenue: { $sum: '$total_amount' } } }]).toArray());
registerTask(57, "Orders", "Find average order amount", "db.orders.aggregate([\n  { $group: { _id: null, average_amount: { $avg: '$total_amount' } } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: null, average_amount: { $avg: '$total_amount' } } }]).toArray());
registerTask(58, "Orders", "Find highest order amount", "db.orders.aggregate([\n  { $group: { _id: null, highest_amount: { $max: '$total_amount' } } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: null, highest_amount: { $max: '$total_amount' } } }]).toArray());
registerTask(59, "Orders", "Find lowest order amount", "db.orders.aggregate([\n  { $group: { _id: null, lowest_amount: { $min: '$total_amount' } } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: null, lowest_amount: { $min: '$total_amount' } } }]).toArray());
registerTask(60, "Orders", "Count orders based on status", "db.orders.aggregate([\n  { $group: { _id: '$status', order_count: { $sum: 1 } } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: '$status', order_count: { $sum: 1 } } }]).toArray());
registerTask(61, "Orders", "Display statuses having more than one order", "db.orders.aggregate([\n  { $group: { _id: '$status', order_count: { $sum: 1 } } },\n  { $match: { order_count: { $gt: 1 } } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: '$status', order_count: { $sum: 1 } } }, { $match: { order_count: { $gt: 1 } } }]).toArray());
registerTask(62, "Orders", "Display order statuses sorted by order count", "db.orders.aggregate([\n  { $group: { _id: '$status', order_count: { $sum: 1 } } },\n  { $sort: { order_count: 1 } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: '$status', order_count: { $sum: 1 } } }, { $sort: { order_count: 1 } }]).toArray());
registerTask(63, "Orders", "Find the total revenue generated from delivered orders", "db.orders.aggregate([\n  { $match: { status: 'Delivered' } },\n  { $group: { _id: null, total_delivered_revenue: { $sum: '$total_amount' } } }\n])", db => db.collection('orders').aggregate([{ $match: { status: 'Delivered' } }, { $group: { _id: null, total_delivered_revenue: { $sum: '$total_amount' } } }]).toArray());
registerTask(64, "Orders", "Find the average amount of delivered orders", "db.orders.aggregate([\n  { $match: { status: 'Delivered' } },\n  { $group: { _id: null, average_delivered_amount: { $avg: '$total_amount' } } }\n])", db => db.collection('orders').aggregate([{ $match: { status: 'Delivered' } }, { $group: { _id: null, average_delivered_amount: { $avg: '$total_amount' } } }]).toArray());
registerTask(65, "Orders", "Find the number of orders placed by each customer", "db.orders.aggregate([\n  { $group: { _id: '$customer_id', order_count: { $sum: 1 } } }\n])", db => db.collection('orders').aggregate([{ $group: { _id: '$customer_id', order_count: { $sum: 1 } } }]).toArray());

// Payments
registerTask(66, "Payments", "Display all payments", "db.payments.find({})", db => db.collection('payments').find({}).toArray());
registerTask(67, "Payments", "Display successful payments", "db.payments.find({ status: 'Success' })", db => db.collection('payments').find({ status: 'Success' }).toArray());
registerTask(68, "Payments", "Display pending payments", "db.payments.find({ status: 'Pending' })", db => db.collection('payments').find({ status: 'Pending' }).toArray());
registerTask(69, "Payments", "Display payments made through UPI", "db.payments.find({ payment_method: 'UPI' })", db => db.collection('payments').find({ payment_method: 'UPI' }).toArray());
registerTask(70, "Payments", "Display payments whose amount is greater than 300", "db.payments.find({ amount: { $gt: 300 } })", db => db.collection('payments').find({ amount: { $gt: 300 } }).toArray());
registerTask(71, "Payments", "Display payments sorted by amount", "db.payments.find({}).sort({ amount: 1 })", db => db.collection('payments').find({}).sort({ amount: 1 }).toArray());
registerTask(72, "Payments", "Display top 3 payments", "db.payments.find({}).sort({ amount: -1 }).limit(3)", db => db.collection('payments').find({}).sort({ amount: -1 }).limit(3).toArray());
registerTask(73, "Payments", "Display payments whose status is not 'Success'", "db.payments.find({ status: { $ne: 'Success' } })", db => db.collection('payments').find({ status: { $ne: 'Success' } }).toArray());
registerTask(74, "Payments", "Display payments made using Cash or UPI", "db.payments.find({ payment_method: { $in: ['Cash', 'UPI'] } })", db => db.collection('payments').find({ payment_method: { $in: ['Cash', 'UPI'] } }).toArray());
registerTask(75, "Payments", "Display payments whose amount lies between 300 and 500", "db.payments.find({ amount: { $gte: 300, $lte: 500 } })", db => db.collection('payments').find({ amount: { $gte: 300, $lte: 500 } }).toArray());
registerTask(76, "Payments", "Find the total amount received", "db.payments.aggregate([\n  { $group: { _id: null, total_amount: { $sum: '$amount' } } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: null, total_amount: { $sum: '$amount' } } }]).toArray());
registerTask(77, "Payments", "Find the average payment amount", "db.payments.aggregate([\n  { $group: { _id: null, average_amount: { $avg: '$amount' } } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: null, average_amount: { $avg: '$amount' } } }]).toArray());
registerTask(78, "Payments", "Find the highest payment amount", "db.payments.aggregate([\n  { $group: { _id: null, highest_amount: { $max: '$amount' } } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: null, highest_amount: { $max: '$amount' } } }]).toArray());
registerTask(79, "Payments", "Find the lowest payment amount", "db.payments.aggregate([\n  { $group: { _id: null, lowest_amount: { $min: '$amount' } } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: null, lowest_amount: { $min: '$amount' } } }]).toArray());
registerTask(80, "Payments", "Count payments by payment method", "db.payments.aggregate([\n  { $group: { _id: '$payment_method', payment_count: { $sum: 1 } } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: '$payment_method', payment_count: { $sum: 1 } } }]).toArray());
registerTask(81, "Payments", "Count payments by status", "db.payments.aggregate([\n  { $group: { _id: '$status', payment_count: { $sum: 1 } } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: '$status', payment_count: { $sum: 1 } } }]).toArray());
registerTask(82, "Payments", "Display payment methods having more than one transaction", "db.payments.aggregate([\n  { $group: { _id: '$payment_method', payment_count: { $sum: 1 } } },\n  { $match: { payment_count: { $gt: 1 } } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: '$payment_method', payment_count: { $sum: 1 } } }, { $match: { payment_count: { $gt: 1 } } }]).toArray());
registerTask(83, "Payments", "Find the total amount received through UPI", "db.payments.aggregate([\n  { $match: { payment_method: 'UPI' } },\n  { $group: { _id: null, total_upi_amount: { $sum: '$amount' } } }\n])", db => db.collection('payments').aggregate([{ $match: { payment_method: 'UPI' } }, { $group: { _id: null, total_upi_amount: { $sum: '$amount' } } }]).toArray());
registerTask(84, "Payments", "Find the average amount received through Credit Card", "db.payments.aggregate([\n  { $match: { payment_method: 'Credit Card' } },\n  { $group: { _id: null, average_cc_amount: { $avg: '$amount' } } }\n])", db => db.collection('payments').aggregate([{ $match: { payment_method: 'Credit Card' } }, { $group: { _id: null, average_cc_amount: { $avg: '$amount' } } }]).toArray());
registerTask(85, "Payments", "Display payment methods sorted by total transaction amount", "db.payments.aggregate([\n  { $group: { _id: '$payment_method', total_amount: { $sum: '$amount' } } },\n  { $sort: { total_amount: -1 } }\n])", db => db.collection('payments').aggregate([{ $group: { _id: '$payment_method', total_amount: { $sum: '$amount' } } }, { $sort: { total_amount: -1 } }]).toArray());

// Delivery Agents
registerTask(86, "Delivery Agents", "Display all delivery agents", "db.delivery_agents.find({})", db => db.collection('delivery_agents').find({}).toArray());
registerTask(87, "Delivery Agents", "Display delivery agents from Bangalore", "db.delivery_agents.find({ city: 'Bangalore' })", db => db.collection('delivery_agents').find({ city: 'Bangalore' }).toArray());
registerTask(88, "Delivery Agents", "Display agents having rating greater than 4.7", "db.delivery_agents.find({ rating: { $gt: 4.7 } })", db => db.collection('delivery_agents').find({ rating: { $gt: 4.7 } }).toArray());
registerTask(89, "Delivery Agents", "Display agents whose names start with 'A'", "db.delivery_agents.find({ agent_name: /^A/ })", db => db.collection('delivery_agents').find({ agent_name: /^A/ }).toArray());
registerTask(90, "Delivery Agents", "Display agents sorted by rating", "db.delivery_agents.find({}).sort({ rating: 1 })", db => db.collection('delivery_agents').find({}).sort({ rating: 1 }).toArray());
registerTask(91, "Delivery Agents", "Find the average agent rating", "db.delivery_agents.aggregate([\n  { $group: { _id: null, average_rating: { $avg: '$rating' } } }\n])", db => db.collection('delivery_agents').aggregate([{ $group: { _id: null, average_rating: { $avg: '$rating' } } }]).toArray());
registerTask(92, "Delivery Agents", "Find the highest rating", "db.delivery_agents.aggregate([\n  { $group: { _id: null, highest_rating: { $max: '$rating' } } }\n])", db => db.collection('delivery_agents').aggregate([{ $group: { _id: null, highest_rating: { $max: '$rating' } } }]).toArray());
registerTask(93, "Delivery Agents", "Find the lowest rating", "db.delivery_agents.aggregate([\n  { $group: { _id: null, lowest_rating: { $min: '$rating' } } }\n])", db => db.collection('delivery_agents').aggregate([{ $group: { _id: null, lowest_rating: { $min: '$rating' } } }]).toArray());
registerTask(94, "Delivery Agents", "Count agents city-wise", "db.delivery_agents.aggregate([\n  { $group: { _id: '$city', agent_count: { $sum: 1 } } }\n])", db => db.collection('delivery_agents').aggregate([{ $group: { _id: '$city', agent_count: { $sum: 1 } } }]).toArray());
registerTask(95, "Delivery Agents", "Display cities having more than one agent", "db.delivery_agents.aggregate([\n  { $group: { _id: '$city', agent_count: { $sum: 1 } } },\n  { $match: { agent_count: { $gt: 1 } } }\n])", db => db.collection('delivery_agents').aggregate([{ $group: { _id: '$city', agent_count: { $sum: 1 } } }, { $match: { agent_count: { $gt: 1 } } }]).toArray());

// Reviews
registerTask(96, "Reviews", "Display all reviews", "db.reviews.find({})", db => db.collection('reviews').find({}).toArray());
registerTask(97, "Reviews", "Display reviews with rating 5", "db.reviews.find({ rating: 5 })", db => db.collection('reviews').find({ rating: 5 }).toArray());
registerTask(98, "Reviews", "Display reviews with rating greater than 4", "db.reviews.find({ rating: { $gt: 4 } })", db => db.collection('reviews').find({ rating: { $gt: 4 } }).toArray());
registerTask(99, "Reviews", "Display reviews given by customer ID 1", "db.reviews.find({ customer_id: 1 })", db => db.collection('reviews').find({ customer_id: 1 }).toArray());
registerTask(100, "Reviews", "Display reviews sorted by rating", "db.reviews.find({}).sort({ rating: 1 })", db => db.collection('reviews').find({}).sort({ rating: 1 }).toArray());
registerTask(101, "Reviews", "Find the average review rating", "db.reviews.aggregate([\n  { $group: { _id: null, average_rating: { $avg: '$rating' } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: null, average_rating: { $avg: '$rating' } } }]).toArray());
registerTask(102, "Reviews", "Find the highest review rating", "db.reviews.aggregate([\n  { $group: { _id: null, highest_rating: { $max: '$rating' } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: null, highest_rating: { $max: '$rating' } } }]).toArray());
registerTask(103, "Reviews", "Find the lowest review rating", "db.reviews.aggregate([\n  { $group: { _id: null, lowest_rating: { $min: '$rating' } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: null, lowest_rating: { $min: '$rating' } } }]).toArray());
registerTask(104, "Reviews", "Count reviews for each restaurant", "db.reviews.aggregate([\n  { $group: { _id: '$restaurant_id', review_count: { $sum: 1 } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: '$restaurant_id', review_count: { $sum: 1 } } }]).toArray());
registerTask(105, "Reviews", "Display restaurants having more than one review", "db.reviews.aggregate([\n  { $group: { _id: '$restaurant_id', review_count: { $sum: 1 } } },\n  { $match: { review_count: { $gt: 1 } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: '$restaurant_id', review_count: { $sum: 1 } } }, { $match: { review_count: { $gt: 1 } } }]).toArray());
registerTask(106, "Reviews", "Find the average rating for each restaurant", "db.reviews.aggregate([\n  { $group: { _id: '$restaurant_id', average_rating: { $avg: '$rating' } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: '$restaurant_id', average_rating: { $avg: '$rating' } } }]).toArray());
registerTask(107, "Reviews", "Display restaurants sorted by average rating", "db.reviews.aggregate([\n  { $group: { _id: '$restaurant_id', average_rating: { $avg: '$rating' } } },\n  { $sort: { average_rating: 1 } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: '$restaurant_id', average_rating: { $avg: '$rating' } } }, { $sort: { average_rating: 1 } }]).toArray());
registerTask(108, "Reviews", "Find the total number of 5-star reviews", "db.reviews.countDocuments({ rating: 5 })", async db => ({ total_5_star_reviews: await db.collection('reviews').countDocuments({ rating: 5 }) }));
registerTask(109, "Reviews", "Count reviews based on rating", "db.reviews.aggregate([\n  { $group: { _id: '$rating', review_count: { $sum: 1 } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: '$rating', review_count: { $sum: 1 } } }]).toArray());
registerTask(110, "Reviews", "Display ratings having more than one review", "db.reviews.aggregate([\n  { $group: { _id: '$rating', review_count: { $sum: 1 } } },\n  { $match: { review_count: { $gt: 1 } } }\n])", db => db.collection('reviews').aggregate([{ $group: { _id: '$rating', review_count: { $sum: 1 } } }, { $match: { review_count: { $gt: 1 } } }]).toArray());

// Advanced Aggregations (Tasks 111 - 119)
registerTask(111, "Advanced", "Find the restaurant generating the highest revenue", "db.orders.aggregate([\n  { $group: { _id: '$restaurant_id', total_revenue: { $sum: '$total_amount' } } },\n  { $sort: { total_revenue: -1 } },\n  { $limit: 1 },\n  { $lookup: {\n      from: 'restaurants',\n      localField: '_id',\n      foreignField: 'restaurant_id',\n      as: 'restaurant_details'\n    }\n  },\n  { $unwind: '$restaurant_details' },\n  { $project: {\n      restaurant_id: '$_id',\n      restaurant_name: '$restaurant_details.restaurant_name',\n      total_revenue: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('orders').aggregate([
  { $group: { _id: "$restaurant_id", total_revenue: { $sum: "$total_amount" } } },
  { $sort: { total_revenue: -1 } },
  { $limit: 1 },
  { $lookup: { from: "restaurants", localField: "_id", foreignField: "restaurant_id", as: "restaurant_details" } },
  { $unwind: "$restaurant_details" },
  { $project: { restaurant_id: "$_id", restaurant_name: "$restaurant_details.restaurant_name", total_revenue: 1, _id: 0 } }
]).toArray());

registerTask(112, "Advanced", "Find the customer who placed the maximum number of orders", "db.orders.aggregate([\n  { $group: { _id: '$customer_id', order_count: { $sum: 1 } } },\n  { $sort: { order_count: -1 } },\n  { $limit: 1 },\n  { $lookup: {\n      from: 'customers',\n      localField: '_id',\n      foreignField: 'customer_id',\n      as: 'customer_details'\n    }\n  },\n  { $unwind: '$customer_details' },\n  { $project: {\n      customer_id: '$_id',\n      customer_name: '$customer_details.name',\n      order_count: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('orders').aggregate([
  { $group: { _id: "$customer_id", order_count: { $sum: 1 } } },
  { $sort: { order_count: -1 } },
  { $limit: 1 },
  { $lookup: { from: "customers", localField: "_id", foreignField: "customer_id", as: "customer_details" } },
  { $unwind: "$customer_details" },
  { $project: { customer_id: "$_id", customer_name: "$customer_details.name", order_count: 1, _id: 0 } }
]).toArray());

registerTask(113, "Advanced", "Find the most popular payment method", "db.payments.aggregate([\n  { $group: { _id: '$payment_method', transaction_count: { $sum: 1 } } },\n  { $sort: { transaction_count: -1 } },\n  { $limit: 1 },\n  { $project: {\n      payment_method: '$_id',\n      transaction_count: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('payments').aggregate([
  { $group: { _id: "$payment_method", transaction_count: { $sum: 1 } } },
  { $sort: { transaction_count: -1 } },
  { $limit: 1 },
  { $project: { payment_method: "$_id", transaction_count: 1, _id: 0 } }
]).toArray());

registerTask(114, "Advanced", "Find the city with the maximum customers", "db.customers.aggregate([\n  { $group: { _id: '$city', customer_count: { $sum: 1 } } },\n  { $sort: { customer_count: -1 } },\n  { $limit: 1 },\n  { $project: {\n      city: '$_id',\n      customer_count: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('customers').aggregate([
  { $group: { _id: "$city", customer_count: { $sum: 1 } } },
  { $sort: { customer_count: -1 } },
  { $limit: 1 },
  { $project: { city: "$_id", customer_count: 1, _id: 0 } }
]).toArray());

registerTask(115, "Advanced", "Find the city having the highest number of restaurants", "db.restaurants.aggregate([\n  { $group: { _id: '$city', restaurant_count: { $sum: 1 } } },\n  { $sort: { restaurant_count: -1 } },\n  { $limit: 1 },\n  { $project: {\n      city: '$_id',\n      restaurant_count: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('restaurants').aggregate([
  { $group: { _id: "$city", restaurant_count: { $sum: 1 } } },
  { $sort: { restaurant_count: -1 } },
  { $limit: 1 },
  { $project: { city: "$_id", restaurant_count: 1, _id: 0 } }
]).toArray());

registerTask(116, "Advanced", "Find the top 3 restaurants based on average ratings", "db.reviews.aggregate([\n  { $group: { _id: '$restaurant_id', average_rating: { $avg: '$rating' } } },\n  { $sort: { average_rating: -1 } },\n  { $limit: 3 },\n  { $lookup: {\n      from: 'restaurants',\n      localField: '_id',\n      foreignField: 'restaurant_id',\n      as: 'restaurant_details'\n    }\n  },\n  { $unwind: '$restaurant_details' },\n  { $project: {\n      restaurant_id: '$_id',\n      restaurant_name: '$restaurant_details.restaurant_name',\n      average_rating: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('reviews').aggregate([
  { $group: { _id: "$restaurant_id", average_rating: { $avg: "$rating" } } },
  { $sort: { average_rating: -1 } },
  { $limit: 3 },
  { $lookup: { from: "restaurants", localField: "_id", foreignField: "restaurant_id", as: "restaurant_details" } },
  { $unwind: "$restaurant_details" },
  { $project: { restaurant_id: "$_id", restaurant_name: "$restaurant_details.restaurant_name", average_rating: 1, _id: 0 } }
]).toArray());

registerTask(117, "Advanced", "Find the top 5 customers based on order count", "db.orders.aggregate([\n  { $group: { _id: '$customer_id', order_count: { $sum: 1 } } },\n  { $sort: { order_count: -1 } },\n  { $limit: 5 },\n  { $lookup: {\n      from: 'customers',\n      localField: '_id',\n      foreignField: 'customer_id',\n      as: 'customer_details'\n    }\n  },\n  { $unwind: '$customer_details' },\n  { $project: {\n      customer_id: '$_id',\n      customer_name: '$customer_details.name',\n      order_count: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('orders').aggregate([
  { $group: { _id: "$customer_id", order_count: { $sum: 1 } } },
  { $sort: { order_count: -1 } },
  { $limit: 5 },
  { $lookup: { from: "customers", localField: "_id", foreignField: "customer_id", as: "customer_details" } },
  { $unwind: "$customer_details" },
  { $project: { customer_id: "$_id", customer_name: "$customer_details.name", order_count: 1, _id: 0 } }
]).toArray());

registerTask(118, "Advanced", "Find the percentage of delivered orders", "db.orders.aggregate([\n  { $group: {\n      _id: null,\n      total_orders: { $sum: 1 },\n      delivered_orders: {\n        $sum: { $cond: [ { $eq: ['$status', 'Delivered'] }, 1, 0 ] }\n      }\n    }\n  },\n  { $project: {\n      total_orders: 1,\n      delivered_orders: 1,\n      delivered_percentage: {\n        $multiply: [ { $divide: ['$delivered_orders', '$total_orders'] }, 100 ]\n      },\n      _id: 0\n    }\n  }\n])", db => db.collection('orders').aggregate([
  { $group: { _id: null, total_orders: { $sum: 1 }, delivered_orders: { $sum: { $cond: [ { $eq: ["$status", "Delivered"] }, 1, 0 ] } } } },
  { $project: { total_orders: 1, delivered_orders: 1, delivered_percentage: { $multiply: [ { $divide: ["$delivered_orders", "$total_orders"] }, 100 ] }, _id: 0 } }
]).toArray());

registerTask(119, "Advanced", "Find the average order amount city-wise", "db.orders.aggregate([\n  { $lookup: {\n      from: 'customers',\n      localField: 'customer_id',\n      foreignField: 'customer_id',\n      as: 'customer_details'\n    }\n  },\n  { $unwind: '$customer_details' },\n  { $group: { _id: '$customer_details.city', average_order_amount: { $avg: '$total_amount' } } },\n  { $project: {\n      city: '$_id',\n      average_order_amount: 1,\n      _id: 0\n    }\n  }\n])", db => db.collection('orders').aggregate([
  { $lookup: { from: "customers", localField: "customer_id", foreignField: "customer_id", as: "customer_details" } },
  { $unwind: "$customer_details" },
  { $group: { _id: "$customer_details.city", average_order_amount: { $avg: "$total_amount" } } },
  { $project: { city: "$_id", average_order_amount: 1, _id: 0 } }
]).toArray());


// API: List all tasks metadata
app.get('/api/tasks', (req, res) => {
  const metadata = Object.values(tasks).map(t => ({
    id: t.id,
    category: t.category,
    title: t.title,
    queryStr: t.queryStr
  }));
  res.json(metadata);
});

// API: Run a specific task query
app.get('/api/run-task/:id', async (req, res) => {
  if (!db) return res.status(500).json({ error: 'Database not connected' });
  
  const id = parseInt(req.params.id);
  const task = tasks[id];
  
  if (!task) return res.status(404).json({ error: `Task ${id} not found` });
  
  try {
    const result = await task.runner(db);
    res.json({
      id: task.id,
      title: task.title,
      queryStr: task.queryStr,
      result: result
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback index.html router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
