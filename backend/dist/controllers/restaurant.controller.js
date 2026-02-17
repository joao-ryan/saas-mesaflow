"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantDetails = exports.setupRestaurant = void 0;
const restaurant_service_1 = __importDefault(require("../services/restaurant.service"));
const setupRestaurant = async (req, res) => {
    try {
        const result = await restaurant_service_1.default.registerWithTable(req.body);
        res.status(201).json({
            status: 'success',
            data: result
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};
exports.setupRestaurant = setupRestaurant;
const getRestaurantDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurant_service_1.default.getById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.status(200).json({ status: 'success', data: restaurant });
    }
    catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
exports.getRestaurantDetails = getRestaurantDetails;
