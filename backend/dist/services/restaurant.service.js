"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../config/database"));
class RestaurantService {
    static async registerWithTable(data) {
        const { restaurantName, restaurantSlug, ownerEmail, ownerPassword, ownerName } = data;
        const client = await database_1.default.connect();
        try {
            await client.query('BEGIN');
            // 1. Create Restaurant
            const restaurantQuery = `
        INSERT INTO restaurants (name, slug)
        VALUES ($1, $2)
        RETURNING *
      `;
            const restaurantResult = await client.query(restaurantQuery, [restaurantName, restaurantSlug]);
            const restaurant = restaurantResult.rows[0];
            // 2. Create Owner User
            const hashedPassword = await bcryptjs_1.default.hash(ownerPassword, 12);
            const userQuery = `
        INSERT INTO users (email, password, name, restaurant_id, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, name, role, restaurant_id
      `;
            const userValues = [ownerEmail, hashedPassword, ownerName, restaurant.id, 'OWNER'];
            const userResult = await client.query(userQuery, userValues);
            const user = userResult.rows[0];
            await client.query('COMMIT');
            return { restaurant, user };
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    static async getById(id) {
        const restaurantQuery = 'SELECT * FROM restaurants WHERE id = $1';
        const restaurantResult = await database_1.default.query(restaurantQuery, [id]);
        const restaurant = restaurantResult.rows[0];
        if (!restaurant)
            return null;
        // Get categories and products
        const categoriesQuery = 'SELECT * FROM categories WHERE restaurant_id = $1';
        const categoriesResult = await database_1.default.query(categoriesQuery, [id]);
        const productsQuery = 'SELECT * FROM products WHERE restaurant_id = $1';
        const productsResult = await database_1.default.query(productsQuery, [id]);
        return {
            ...restaurant,
            categories: categoriesResult.rows,
            products: productsResult.rows
        };
    }
}
exports.RestaurantService = RestaurantService;
exports.default = RestaurantService;
