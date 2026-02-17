"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/v1', routes_1.default);
// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof zod_1.z.ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: err.issues,
        });
    }
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
    });
});
exports.default = app;
