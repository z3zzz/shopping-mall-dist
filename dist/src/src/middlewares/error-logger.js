"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = void 0;
const fs_1 = __importDefault(require("fs"));
function errorLogger(error, req, res, next) {
    const current_datetime = new Date();
    const dateFormatted = current_datetime.getFullYear() +
        '-' +
        (current_datetime.getMonth() + 1) +
        '-' +
        current_datetime.getDate() +
        ' ' +
        current_datetime.getHours() +
        ':' +
        current_datetime.getMinutes() +
        ':' +
        current_datetime.getSeconds();
    const method = req.method;
    const url = req.url;
    const errorContent = error.stack;
    const errorLog = `[${dateFormatted}] ${method}:${url}\n${errorContent}\n\n`;
    fs_1.default.appendFile('error.log', errorLog, (err) => {
        if (err) {
            console.log(err);
        }
    });
    next(error);
}
exports.errorLogger = errorLogger;
