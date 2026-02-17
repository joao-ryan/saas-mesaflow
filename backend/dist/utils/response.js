"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, data, statusCode = 200) => {
    res.status(statusCode).json({
        status: 'success',
        data,
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, message, statusCode = 500, errors) => {
    res.status(statusCode).json({
        status: 'error',
        message,
        errors,
    });
};
exports.sendError = sendError;
