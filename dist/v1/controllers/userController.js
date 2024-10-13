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
const models_1 = __importDefault(require("../models"));
const bcrypt_1 = require("../helper/bcrypt");
const User = models_1.default.User;
class UserController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body) {
                    res.status(400).json({ message: 'Request body is empty' });
                    return;
                }
                const { name, email, password, role } = req.body;
                console.log(req.body);
                const getUser = yield User.findOne({ where: { email } });
                if (getUser) {
                    res.status(409).json({ message: 'User already exists' });
                    return;
                }
                const user = User.create({ name, email, password: (0, bcrypt_1.hashPassword)(password), role });
                res.status(201).json({ message: 'User created successfully' });
                return;
            }
            catch (err) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.findAll();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
            finally {
                return;
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findByPk(req.params.id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
            finally {
                return;
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                if (req.query.id) {
                    user = yield User.findByPk(req.query.id);
                }
                else if (req.query.email) {
                    user = yield User.findOne({ where: { email: req.query.email } });
                }
                else {
                    res.status(400).json({ message: 'Invalid query parameter' });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
            finally {
                return;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User.update(req.body, { where: { id: req.params.id } });
                res.status(200).json({ message: 'User updated successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
            finally {
                return;
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: 'User deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
            finally {
                return;
            }
        });
    }
}
exports.default = UserController;
