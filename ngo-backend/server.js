import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import axios from "axios"

dotenv.config()

const app = express()

// ✅ VERY IMPORTANT: CORS MUST BE THIS SIMPLE
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

// ✅ MUST come AFTER cors
app.use(express.json())

// ✅ Health check
app.get("/", (req, res) => {
  res.send("NGO Backend is running 🚀")
})

// ✅ CREATE ORDER
app.post("/create-order", async (req, res) => {
  try {
    const { amount, donorName, donorEmail, donorPhone } = req.body

    const response = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/orders`,
      {
        order_id: "order_" + Date.now(),
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "cust_" + Date.now(),
          customer_name: donorName,
          customer_email: donorEmail,
          customer_phone: donorPhone,
        },
      },
      {
        headers: {
            "x-client-id": process.env.CASHFREE_CLIENT_ID,
            "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
            "x-api-version": "2022-09-01",
            "Content-Type": "application/json",
          },
          
      }
    )

    res.json(response.data)
  } catch (err) {
    console.error("Create order error:", err.response?.data || err.message)
    res.status(500).json({ error: "Order creation failed" })
  }
})

// ✅ WEBHOOK
app.post("/cashfree-webhook", (req, res) => {
  console.log("Webhook received:", req.body)
  res.status(200).send("OK")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
