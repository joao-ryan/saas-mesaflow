"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const init_db_1 = __importDefault(require("./config/init_db"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // Initialize database schema
        await (0, init_db_1.default)();
        const server = app_1.default.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
        // Graceful Shutdown
        const shutdown = () => {
            console.log('Servidor fechando...');
            server.close(() => {
                console.log('Servidor fechado.');
                process.exit(0);
            });
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        console.error('Falha ao iniciar o servidor:', error);
        process.exit(1);
    }
};
startServer();
