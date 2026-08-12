"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, _req, res, _next) => {
    console.error(error);
    const message = error instanceof Error
        ? error.message
        : "Something went wrong";
    return res.status(500).json({
        success: false,
        message,
        data: null,
    });
};
exports.errorMiddleware = errorMiddleware;
