# Online Food Delivery System (Swiggy/Zomato Clone) using MongoDB

This is a comprehensive NoSQL database project representing a real-world **Online Food Delivery System** (similar to Swiggy or Zomato) implemented on MongoDB. It covers database design, data seeding, and 120 distinct query operations including filters, complex aggregations, and advanced business analytics.

## Folder Structure
```text
food-delivery-project/
│
├── README.md             # Detailed documentation, schemas, and task descriptions
├── mongodb_project.js    # Main project orchestrator to seed data and execute all tasks
├── sample_data.js        # Script containing seed data for all 7 collections
│
├── queries/              # Query modules grouped by collection
│   ├── customers.js      # Tasks 1 to 15 (Customer filters and aggregations)
│   ├── restaurants.js    # Tasks 16 to 30 (Restaurant filters and aggregations)
│   ├── menu.js          # Tasks 31 to 45 (Menu filters and aggregations)
│   ├── orders.js        # Tasks 46 to 65 (Order filters and aggregations)
│   ├── payments.js      # Tasks 66 to 85 (Payment filters and aggregations)
│   ├── delivery_agents.js # Tasks 86 to 95 (Delivery Agent filters and aggregations)
│   ├── reviews.js        # Tasks 96 to 110 (Review filters and aggregations)
│   └── advanced.js       # Tasks 111 to 119 (Cross-collection advanced analytics)
│
└── screenshots/          # Folder to store validation screenshots of execution
```

---

## Schema Design & Collections

The database `food_delivery_db` consists of 7 collections:

### 1. `customers`
Stores customer information.
* **Fields:**
  - `customer_id` (Number): Unique identifier for the customer
  - `name` (String): Full name of the customer
  - `email` (String): Email address
  - `phone` (String): 10-digit mobile number
  - `city` (String): City of residence

### 2. `restaurants`
Stores restaurant information.
* **Fields:**
  - `restaurant_id` (Number): Unique identifier for the restaurant
  - `restaurant_name` (String): Name of the restaurant
  - `city` (String): City where it is located
  - `rating` (Number): Overall rating of the restaurant (1.0 to 5.0)

### 3. `menu`
Stores menu items offered by restaurants.
* **Fields:**
  - `item_id` (Number): Unique identifier for the menu item
  - `restaurant_id` (Number): Associated restaurant identifier
  - `item_name` (String): Name of the dish
  - `price` (Number): Price in INR (₹)

### 4. `orders`
Stores order details placed by customers.
* **Fields:**
  - `order_id` (Number): Unique identifier for the order
  - `customer_id` (Number): Customer who placed the order
  - `restaurant_id` (Number): Restaurant fulfilling the order
  - `items` (Array of Subdocuments):
    - `item_name` (String): Name of the menu item
    - `quantity` (Number): Number of items ordered
    - `price` (Number): Unit price of the item
  - `total_amount` (Number): Sum of the quantity * price for all items
  - `status` (String): Current status (`Delivered`, `Pending`, etc.)

### 5. `payments`
Stores transaction details for orders.
* **Fields:**
  - `payment_id` (Number): Unique identifier for the payment
  - `order_id` (Number): Associated order identifier
  - `payment_method` (String): Payment channel (`UPI`, `Credit Card`, `Cash`, etc.)
  - `amount` (Number): Transaction amount paid
  - `status` (String): Transaction status (`Success`, `Pending`, etc.)

### 6. `delivery_agents`
Stores delivery partner information.
* **Fields:**
  - `agent_id` (Number): Unique identifier for the agent
  - `agent_name` (String): Name of the delivery agent
  - `city` (String): Operating city
  - `rating` (Number): Agent's performance rating (1.0 to 5.0)

### 7. `reviews`
Stores customer ratings and feedback for restaurants.
* **Fields:**
  - `review_id` (Number): Unique identifier for the review
  - `customer_id` (Number): Customer giving the review
  - `restaurant_id` (Number): Restaurant being reviewed
  - `rating` (Number): Rating given (1 to 5)
  - `comment` (String): Text feedback

---

## How to Execute the Project

### Option A: Interactive Web Dashboard (Recommended)
1. Start your local MongoDB server (running on `localhost:27017`).
2. Open your terminal in the project directory (`Major_project/`) and run:
   ```bash
   npm install
   npm start
   ```
3. Open your web browser and navigate to the localhost web page:
   [http://localhost:3000](http://localhost:3000)
4. Click the **"Seed Database"** button to load sample data, then navigate the sidebar tasks to execute and view MongoDB queries interactively.

### Option B: Mongo Shell CLI Execution
1. Start your local MongoDB server.
2. Run the orchestrator script using `mongosh`:
   ```bash
   mongosh mongodb_project.js
   ```
This script will automatically:
* Switch to the database `food_delivery_db`.
* Seed the collections using data from `sample_data.js`.
* Execute all tasks sequentially and print results directly in the terminal.

---

## Detailed Task Checklist

### Collection 1: Customers
- **Task 1:** Display all customers.
- **Task 2:** Display customers from Bangalore.
- **Task 3:** Display customers not belonging to Hyderabad.
- **Task 4:** Display customers whose names start with 'S'.
- **Task 5:** Display customers whose names end with 'a'.
- **Task 6:** Display customers whose names contain 'ar'.
- **Task 7:** Display customers from Bangalore or Chennai.
- **Task 8:** Display customers from Bangalore and whose name starts with 'A'.
- **Task 9:** Display customers whose city is in Bangalore, Hyderabad, or Pune.
- **Task 10:** Display customers sorted by name.
- **Task 11:** Count the total number of customers.
- **Task 12:** Find the number of customers in each city.
- **Task 13:** Find the city having the maximum number of customers.
- **Task 14:** Display cities having more than one customer.
- **Task 15:** Sort cities by customer count.

### Collection 2: Restaurants
- **Task 16:** Display all restaurants.
- **Task 17:** Display restaurants located in Bangalore.
- **Task 18:** Display restaurants having rating greater than 4.3.
- **Task 19:** Display restaurants having rating between 4.2 and 4.5.
- **Task 20:** Display restaurants whose names start with 'P'.
- **Task 21:** Display restaurants whose names contain 'King'.
- **Task 22:** Display restaurants located in Chennai or Hyderabad.
- **Task 23:** Display restaurants not located in Pune.
- **Task 24:** Display restaurants sorted by rating in descending order.
- **Task 25:** Display the top 3 restaurants based on rating.
- **Task 26:** Find the average restaurant rating.
- **Task 27:** Find the highest rating.
- **Task 28:** Find the lowest rating.
- **Task 29:** Count the number of restaurants in each city.
- **Task 30:** Display cities having more than one restaurant.

### Collection 3: Menu
- **Task 31:** Display all menu items.
- **Task 32:** Display menu items costing more than ₹250.
- **Task 33:** Display menu items costing between ₹200 and ₹400.
- **Task 34:** Display menu items belonging to restaurant ID 101.
- **Task 35:** Display menu items whose names start with 'C'.
- **Task 36:** Display menu items whose names contain 'Pizza'.
- **Task 37:** Display menu items sorted by price in ascending order.
- **Task 38:** Display the top 3 expensive menu items.
- **Task 39:** Display menu items whose prices are less than ₹300.
- **Task 40:** Display menu items whose prices are not equal to ₹350.
- **Task 41:** Find the average menu price.
- **Task 42:** Find the maximum menu price.
- **Task 43:** Find the minimum menu price.
- **Task 44:** Find the total price of all menu items.
- **Task 45:** Find the number of menu items available in each restaurant.

### Collection 4: Orders
- **Task 46:** Display all orders.
- **Task 47:** Display delivered orders.
- **Task 48:** Display pending orders.
- **Task 49:** Display orders having total amount greater than ₹400.
- **Task 50:** Display orders having total amount between ₹300 and ₹600.
- **Task 51:** Display orders placed by customer ID 1.
- **Task 52:** Display orders sorted by amount in descending order.
- **Task 53:** Display the top 3 highest orders.
- **Task 54:** Display orders whose status is not "Delivered".
- **Task 55:** Display orders having amount greater than ₹300 and status "Delivered".
- **Task 56:** Find total revenue generated.
- **Task 57:** Find average order amount.
- **Task 58:** Find highest order amount.
- **Task 59:** Find lowest order amount.
- **Task 60:** Count orders based on status.
- **Task 61:** Display statuses having more than one order.
- **Task 62:** Display order statuses sorted by order count.
- **Task 63:** Find the total revenue generated from delivered orders.
- **Task 64:** Find the average amount of delivered orders.
- **Task 65:** Find the number of orders placed by each customer.

### Collection 5: Payments
- **Task 66:** Display all payments.
- **Task 67:** Display successful payments.
- **Task 68:** Display pending payments.
- **Task 69:** Display payments made through UPI.
- **Task 70:** Display payments whose amount is greater than ₹300.
- **Task 71:** Display payments sorted by amount.
- **Task 72:** Display top 3 payments.
- **Task 73:** Display payments whose status is not "Success".
- **Task 74:** Display payments made using Cash or UPI.
- **Task 75:** Display payments whose amount lies between ₹300 and ₹500.
- **Task 76:** Find the total amount received.
- **Task 77:** Find the average payment amount.
- **Task 78:** Find the highest payment amount.
- **Task 79:** Find the lowest payment amount.
- **Task 80:** Count payments by payment method.
- **Task 81:** Count payments by status.
- **Task 82:** Display payment methods having more than one transaction.
- **Task 83:** Find the total amount received through UPI.
- **Task 84:** Find the average amount received through Credit Card.
- **Task 85:** Display payment methods sorted by total transaction amount.

### Collection 6: Delivery Agents
- **Task 86:** Display all delivery agents.
- **Task 87:** Display delivery agents from Bangalore.
- **Task 88:** Display agents having rating greater than 4.7.
- **Task 89:** Display agents whose names start with 'A'.
- **Task 90:** Display agents sorted by rating.
- **Task 91:** Find the average agent rating.
- **Task 92:** Find the highest rating.
- **Task 93:** Find the lowest rating.
- **Task 94:** Count agents city-wise.
- **Task 95:** Display cities having more than one agent.

### Collection 7: Reviews
- **Task 96:** Display all reviews.
- **Task 97:** Display reviews with rating 5.
- **Task 98:** Display reviews with rating greater than 4.
- **Task 99:** Display reviews given by customer ID 1.
- **Task 100:** Display reviews sorted by rating.
- **Task 101:** Find the average review rating.
- **Task 102:** Find the highest review rating.
- **Task 103:** Find the lowest review rating.
- **Task 104:** Count reviews for each restaurant.
- **Task 105:** Display restaurants having more than one review.
- **Task 106:** Find the average rating for each restaurant.
- **Task 107:** Display restaurants sorted by average rating.
- **Task 108:** Find the total number of 5-star reviews.
- **Task 109:** Count reviews based on rating.
- **Task 110:** Display ratings having more than one review.

### Advanced Aggregations (Cross-Collection)
- **Task 111:** Find the restaurant generating the highest revenue.
- **Task 112:** Find the customer who placed the maximum number of orders.
- **Task 113:** Find the most popular payment method.
- **Task 114:** Find the city with the maximum customers.
- **Task 115:** Find the city having the highest number of restaurants.
- **Task 116:** Find the top 3 restaurants based on average ratings.
- **Task 117:** Find the top 5 customers based on order count.
- **Task 118:** Find the percentage of delivered orders.
- **Task 119:** Find the average order amount city-wise.
- **Task 120:** Upload the entire project to Github and write the description about the project in the ReadME file and submit the link in the panel.
