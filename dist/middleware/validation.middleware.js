"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequiredFields = void 0;
const validateRequiredFields = (fields) => {
    return (req, res, next) => {
        const missingFields = fields.filter((field) => req.body[field] === undefined ||
            req.body[field] === null ||
            req.body[field] === "");
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(", ")}`,
                data: null,
            });
        }
        next();
    };
};
exports.validateRequiredFields = validateRequiredFields;
