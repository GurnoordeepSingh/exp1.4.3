const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const TOTAL_SEATS = 100;
let remainingSeats = TOTAL_SEATS;

app.get("/", (req, res) => {
    res.send("Ticket Booking System API is running 🚀");
});

app.post("/api/book", (req, res) => {

    if (remainingSeats <= 0) {
        return res.json({
            success: false,
            message: "No seats left"
        });
    }

    remainingSeats--;

    res.json({
        success: true,
        bookingId: Date.now(),
        remaining: remainingSeats
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});