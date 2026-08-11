import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/category.routes";

import authRoutes from "./routes/auth.routes";


const app = express();
app.use("/api/categories", categoryRoutes);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Glow-up Salon Booking API is running!",
  });
});

// Routes
app.use("/api/auth", authRoutes);

export default app;