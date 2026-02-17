"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRestaurantSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
    restaurantId: zod_1.z.string().optional(),
    role: zod_1.z.enum(['ADMIN', 'OWNER', 'MANAGER', 'STAFF', 'CUSTOMER']).optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.setupRestaurantSchema = zod_1.z.object({
    restaurantName: zod_1.z.string().min(2),
    restaurantSlug: zod_1.z.string().min(2),
    ownerEmail: zod_1.z.string().email(),
    ownerPassword: zod_1.z.string().min(6),
    ownerName: zod_1.z.string().min(2),
});
