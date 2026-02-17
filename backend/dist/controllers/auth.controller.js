"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const register = async (req, res) => {
    try {
        const user = await auth_service_1.default.register(req.body);
        res.status(201).json({
            status: 'success',
            data: { user }
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { user, token } = await auth_service_1.default.login(req.body);
        res.status(200).json({
            status: 'success',
            data: { user, token }
        });
    }
    catch (error) {
        res.status(401).json({
            status: 'error',
            message: error.message
        });
    }
};
exports.login = login;
