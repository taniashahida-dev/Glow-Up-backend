"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const service_routes_1 = __importDefault(require("./routes/service.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const not_found_middleware_1 = require("./middleware/not-found.middleware");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Glow Up Backend API is running",
        data: null,
    });
});
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/categories", category_routes_1.default);
app.use("/api/services", service_routes_1.default);
app.use("/api/bookings", booking_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
// 404 Handler - MUST BE AFTER ALL ROUTES
app.use(not_found_middleware_1.notFoundMiddleware);
// Global Error Handler - MUST BE LAST
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
