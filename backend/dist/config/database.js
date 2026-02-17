"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.query = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.DATABASE_URL;
if (connectionString) {
    const redacted = connectionString.replace(/:([^:@]+)@/, ':****@');
    console.log('Using connection string:', redacted);
}
const pool = new pg_1.Pool({
    connectionString,
    ssl: connectionString?.includes('neon.tech') ? { rejectUnauthorized: false } : (process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false),
});
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
const query = (text, params) => pool.query(text, params);
exports.query = query;
const getClient = () => pool.connect();
exports.getClient = getClient;
exports.default = pool;
