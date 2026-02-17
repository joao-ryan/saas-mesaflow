"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./database"));
const initDb = async () => {
    try {
        const sqlPath = path_1.default.join(__dirname, 'init_db.sql');
        const sql = fs_1.default.readFileSync(sqlPath, 'utf8');
        console.log('Initializing database schema...');
        await database_1.default.query(sql);
        console.log('Database schema initialized successfully!');
    }
    catch (error) {
        console.error('Error initializing database schema:', error);
        process.exit(1);
    }
    finally {
        // We don't necessarily want to close the pool if this is called from within the app,
        // but if it's a standalone script, we should.
    }
};
if (require.main === module) {
    initDb().then(() => process.exit(0));
}
exports.default = initDb;
