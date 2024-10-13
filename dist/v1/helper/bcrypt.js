"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    return bcrypt_1.default.hashSync(password, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.comparePassword = comparePassword;
