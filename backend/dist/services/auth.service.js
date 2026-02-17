"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
class AuthService {
    static async register(data) {
        const { email, password, name, restaurantId, role } = data;
        // Check if user exists
        const existingUser = await database_1.default.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        const query = `
      INSERT INTO users (email, password, name, restaurant_id, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, name, role, restaurant_id, created_at
    `;
        const values = [email, hashedPassword, name, restaurantId, role || 'CUSTOMER'];
        const result = await database_1.default.query(query, values);
        return result.rows[0];
    }
    static async login(data) {
        const { email, password } = data;
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await database_1.default.query(query, [email]);
        const user = result.rows[0];
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role, restaurantId: user.restaurant_id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        // Don't return password
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
