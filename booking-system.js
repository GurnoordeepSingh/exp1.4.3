const express = require("express");
const redis = require("redis");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Create Redis client
const client = redis.createClient();

client.on("error", (err) => {
    console.log("Redis Client Error", err);
});

// Connect Redis
async function connectRedis() {
    await client.connect();
}
connectRedis();

const TOTAL_SEATS = 100;

// Function to get remaining seats
async function getRemainingSeats() {
    let seats = await client.get("seats");

    if (!seats) {
        await client.set("seats", TOTAL_SEATS);
        return TOTAL_SEATS;
    }

    return parseInt(seats);
}

// Booking API
app.post("/api/book", async (req, res) => {

    const remaining = await getRemainingSeats();

    if (remaining <= 0) {
        return res.json({
            success: false,
            message: "No seats left"
        });
    }

    const newSeats = remaining - 1;

    await client.set("seats", newSeats);

    res.json({
        success: true,
        bookingId: Date.now(),
        remaining: newSeats
    });

});

// Use dynamic port for cloud deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Booking system running on port ${PORT}`);
});