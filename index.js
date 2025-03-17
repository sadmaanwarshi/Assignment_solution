import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "billing_system",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 5432,
});

// API to insert customer & billing data
app.post("/api/bill", async (req, res) => {
  const { name, phone, billnum, amount } = req.body;

  if (!name || !phone || !amount) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const customerResult = await pool.query(
      "INSERT INTO customer (name, phone , bill_num) VALUES ($1, $2, $3) RETURNING id",
      [name, phone, billnum]
    );

    const customerId = customerResult.rows[0].id;

    await pool.query("INSERT INTO bills (customer_id, amount) VALUES ($1, $2)", [
      customerId,
      amount,
    ]);

    res.status(201).json({ message: "Bill added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to fetch all customers & their bills
app.get("/api/bills", async (req, res) => {
    const { billnum } = req.query;
  try {
    const result = await pool.query(
      `SELECT customer.id, customer.name, customer.phone, customer.bill_num, bills.amount 
       FROM customer
       JOIN bills ON customer.id = bills.customer_id WHERE customer.bill_num = $1`,[billnum]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
