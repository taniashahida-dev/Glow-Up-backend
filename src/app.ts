import express from "express";
import cors from "cors";

import categoryRoutes from "./routes/category.routes";
import authRoutes from "./routes/auth.routes";
import serviceRoutes from "./routes/service.routes";
import bookingRoutes from "./routes/booking.routes";
import reviewRoutes from "./routes/review.routes";

import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Glow Up Backend API is running",
    data: null,
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

// 404 Handler - MUST BE AFTER ALL ROUTES
app.use(notFoundMiddleware);

// Global Error Handler - MUST BE LAST
app.use(errorMiddleware);

export default app;