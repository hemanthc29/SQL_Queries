// Database: food_delivery_db
// Seeding sample data for 7 collections

console.log("Seeding sample data for food_delivery_db...");

// Drop existing collections for a clean setup
db.customers.drop();
db.restaurants.drop();
db.menu.drop();
db.orders.drop();
db.payments.drop();
db.delivery_agents.drop();
db.reviews.drop();

// 1. Customers
db.customers.insertMany([
  {
    customer_id: 1,
    name: "Saran",
    email: "saran@gmail.com",
    phone: "9876543210",
    city: "Bangalore"
  },
  {
    customer_id: 2,
    name: "Priya",
    email: "priya@gmail.com",
    phone: "9876543211",
    city: "Hyderabad"
  },
  {
    customer_id: 3,
    name: "Rahul",
    email: "rahul@gmail.com",
    phone: "9876543212",
    city: "Chennai"
  },
  {
    customer_id: 4,
    name: "Deepa",
    email: "deepa@gmail.com",
    phone: "9876543213",
    city: "Pune"
  },
  {
    customer_id: 5,
    name: "Anjali",
    email: "anjali@gmail.com",
    phone: "9876543214",
    city: "Bangalore"
  }
]);
console.log("Seeded 'customers' collection.");

// 2. Restaurants
db.restaurants.insertMany([
  {
    restaurant_id: 101,
    restaurant_name: "Pizza Hut",
    city: "Bangalore",
    rating: 4.5
  },
  {
    restaurant_id: 102,
    restaurant_name: "Dominos",
    city: "Hyderabad",
    rating: 4.3
  },
  {
    restaurant_id: 103,
    restaurant_name: "Burger King",
    city: "Chennai",
    rating: 4.4
  },
  {
    restaurant_id: 104,
    restaurant_name: "KFC",
    city: "Pune",
    rating: 4.2
  }
]);
console.log("Seeded 'restaurants' collection.");

// 3. Menu
db.menu.insertMany([
  {
    item_id: 1,
    restaurant_id: 101,
    item_name: "Veg Pizza",
    price: 250
  },
  {
    item_id: 2,
    restaurant_id: 101,
    item_name: "Chicken Pizza",
    price: 350
  },
  {
    item_id: 3,
    restaurant_id: 102,
    item_name: "Cheese Burst Pizza",
    price: 300
  },
  {
    item_id: 4,
    restaurant_id: 103,
    item_name: "Veg Burger",
    price: 180
  },
  {
    item_id: 5,
    restaurant_id: 104,
    item_name: "Chicken Bucket",
    price: 550
  }
]);
console.log("Seeded 'menu' collection.");

// 4. Orders
db.orders.insertMany([
  {
    order_id: 1001,
    customer_id: 1,
    restaurant_id: 101,
    items: [
      {
        item_name: "Veg Pizza",
        quantity: 2,
        price: 250
      }
    ],
    total_amount: 500,
    status: "Delivered"
  },
  {
    order_id: 1002,
    customer_id: 2,
    restaurant_id: 102,
    items: [
      {
        item_name: "Cheese Burst Pizza",
        quantity: 1,
        price: 300
      }
    ],
    total_amount: 300,
    status: "Pending"
  },
  {
    order_id: 1003,
    customer_id: 3,
    restaurant_id: 103,
    items: [
      {
        item_name: "Veg Burger",
        quantity: 2,
        price: 180
      }
    ],
    total_amount: 360,
    status: "Delivered"
  }
]);
console.log("Seeded 'orders' collection.");

// 5. Payments
db.payments.insertMany([
  {
    payment_id: 501,
    order_id: 1001,
    payment_method: "UPI",
    amount: 500,
    status: "Success"
  },
  {
    payment_id: 502,
    order_id: 1002,
    payment_method: "Credit Card",
    amount: 300,
    status: "Pending"
  },
  {
    payment_id: 503,
    order_id: 1003,
    payment_method: "Cash",
    amount: 360,
    status: "Success"
  }
]);
console.log("Seeded 'payments' collection.");

// 6. Delivery Agents
db.delivery_agents.insertMany([
  {
    agent_id: 1,
    agent_name: "Kumar",
    city: "Bangalore",
    rating: 4.8
  },
  {
    agent_id: 2,
    agent_name: "Arjun",
    city: "Hyderabad",
    rating: 4.6
  },
  {
    agent_id: 3,
    agent_name: "Sneha",
    city: "Chennai",
    rating: 4.9
  }
]);
console.log("Seeded 'delivery_agents' collection.");

// 7. Reviews
db.reviews.insertMany([
  {
    review_id: 1,
    customer_id: 1,
    restaurant_id: 101,
    rating: 5,
    comment: "Excellent service"
  },
  {
    review_id: 2,
    customer_id: 2,
    restaurant_id: 102,
    rating: 4,
    comment: "Good taste"
  },
  {
    review_id: 3,
    customer_id: 3,
    restaurant_id: 103,
    rating: 5,
    comment: "Very tasty"
  }
]);
console.log("Seeded 'reviews' collection.");

console.log("Seeding complete!\n");
