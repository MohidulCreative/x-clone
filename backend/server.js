import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.routes.js";
import connnectDB from "./db/connectMongoDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

console.log(process.env.MONGODB_URI);
// Routes
app.use("/api/auth", authroutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connnectDB();
});
