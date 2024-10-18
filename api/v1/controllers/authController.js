"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../helper/bcrypt");
const jwt_1 = require("../helper/jwt");
const models_1 = __importDefault(require("../models"));
const User = models_1.default.User;
const Role = models_1.default.Role;
const ForgotPassword = models_1.default.ForgotPassword;
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const { email, password } = req.body;
                const user = yield User.findOne({ where: { email } });
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                const compare = (0, bcrypt_1.comparePassword)(password, user.password);
                if (!compare) {
                    res.status(401).json({ message: 'Invalid credentials' });
                    return;
                }
                const [role, created] = yield Role.findOrCreate({ where: { value: user.role },
                    defaults: {
                        name: (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.name,
                        value: (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.role) === null || _d === void 0 ? void 0 : _d.value,
                    },
                });
                const token = (0, jwt_1.generateToken)({ id: user.id, name: user.name, email: user.email, role: role === null || role === void 0 ? void 0 : role.value });
                res.status(200).json({ message: 'Login successful', token });
                return;
            }
            catch (err) {
                res.status(500).json({ message: 'Internal server error', err });
                return;
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body) {
                    res.status(400).json({ message: 'Request body is empty' });
                    return;
                }
                console.log(req.body);
                const { name, email, password, role } = req.body;
                const data = req.body;
                console.log(data.role);
                const dataRole = yield Role.findOne({ where: { value: Object.values(data.role)[0] } });
                if (!dataRole) {
                    yield Role.create({ value: Object.values(role)[0] });
                    data.role = Object.values(role)[0];
                }
                else {
                    data.role = dataRole.value;
                }
                console.log(req.body);
                const getUser = yield User.findOne({ where: { email } });
                if (getUser) {
                    res.status(409).json({ message: 'User already exists' });
                    return;
                }
                const user = User.create({ name, email, password: (0, bcrypt_1.hashPassword)(password), role: data.role });
                res.status(201).json({ message: 'User created successfully' });
                return;
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    static forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body, "forgot password");
                const { email } = req.body;
                const user = yield User.findOne({ where: { email } });
                console.log("user", user);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                const token = Math.random().toString(36).substring(7);
                const [forgot, created] = yield ForgotPassword.findOrCreate({ where: { email }, defaults: { email, token } });
                console.log(forgot, created, "ASSSSSSSSSSSSSS");
                // await sendResetEmail(email, forgot.token);
                console.log("email sent");
                res.status(200).json({ message: 'Password reset link sent to email', token: forgot.token });
                return;
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    static getResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.params;
                const forgot = yield ForgotPassword.findOne({ where: { token } });
                if (!forgot) {
                    res.status(404).json({ message: 'Invalid token' });
                    return;
                }
                console.log(forgot);
                res.status(200).json({ message: 'Token verified', email: forgot.email });
                return;
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Internal server error', err });
                return;
            }
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, token, password } = req.body;
                token = req.params.token;
                const user = yield User.findOne({ where: { email } });
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                const forgot = yield ForgotPassword.findOne({ where: { email, token } });
                if (!forgot) {
                    res.status(404).json({ message: 'Invalid token' });
                    return;
                }
                yield User.update({ password: (0, bcrypt_1.hashPassword)(password) }, { where: { email } });
                yield ForgotPassword.destroy({ where: { email, token } });
                res.status(200).json({ message: 'Password reset successful' });
                return;
            }
            catch (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=authController.js.map