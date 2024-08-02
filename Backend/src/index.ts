import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Import routes
import authRoutes from "./Routes/userAuth";

// Use routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
