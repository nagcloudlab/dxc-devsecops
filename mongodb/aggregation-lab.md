use aggDemo

db.customers.drop()
db.orders.drop()

db.customers.insertMany([
  { _id: 1, name: "Alice",   city: "London" },
  { _id: 2, name: "Bob",     city: "Paris"  },
  { _id: 3, name: "Charlie", city: "London" }
])

db.orders.insertMany([
  { _id: 101, customer_id: 1, total: 250, status: "shipped" },
  { _id: 102, customer_id: 1, total: 100, status: "pending" },
  { _id: 103, customer_id: 2, total: 200, status: "shipped" },
  { _id: 104, customer_id: 3, total: 150, status: "cancelled" },
  { _id: 105, customer_id: 2, total: 50,  status: "pending" }
])


Find: Each customer’s total spend and order count.


db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id",
      total_spend: { $sum: "$total" },
      order_count: { $sum: 1 }
    }
  }
])

Find: Only 'shipped' orders, grouped by customer.

db.orders.aggregate([
  {
    $match: { status: "shipped" }
  },
  {
    $group: {
      _id: "$customer_id",
      total_spend: { $sum: "$total" },
      order_count: { $sum: 1 }
    }
  }
])


Find: Just customer_id and total for each order, formatted nicely.

db.orders.aggregate([
  {
    $project: {
      _id: 0,
      orderId: "$_id",
      customerId: "$customer_id",
      total: 1,
      status: 1
    }
  }
])


🛠️ Step 5: Sort Results with $sort

db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id",
      total_spend: { $sum: "$total" },
      order_count: { $sum: 1 }
    }
  },
  {
    $sort: { total_spend: -1 } // Sort by total spend in descending order
  }
])

db.orders.aggregate([
  { $sort: { total: -1 } }
])


🛠️ Step 6: Join Collections with $lookup

Find: List each order, and include the customer’s name and city.

db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customerInfo"
    }
  },
  {
    $unwind: "$customerInfo"
  },
  {
    $project: {
      order_id: "$_id",
      total: 1,
      status: 1,
      customer: "$customerInfo.name",
      city: "$customerInfo.city"
    }
  }
])


🛠️ Step 7: Group, Join, and Report (Mini Dashboard)
Find: For each city, total revenue from 'shipped' orders.

db.orders.aggregate([
  { $match: { status: "shipped" } },
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },
  {
    $group: {
      _id: "$customer.city",
      city_revenue: { $sum: "$total" },
      shipped_orders: { $sum: 1 }
    }
  },
  { $sort: { city_revenue: -1 } }
])

