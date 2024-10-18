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
const jwt_1 = require("../helper/jwt");
const models_1 = __importDefault(require("../models"));
const User = models_1.default.User;
function authenticate(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!token) {
                return { status: false, message: 'Unauthenticated' };
            }
            token = token.split(' ')[1];
            console.log('token', token);
            const { id } = (0, jwt_1.verifyToken)(token);
            console.log('id', id);
            const user = yield User.findByPk(id);
            console.log('user', user);
            if (!user) {
                return { status: false, message: 'User Not Found' };
            }
            return { status: true, user };
        }
        catch (err) {
            console.log(err);
            return { status: false, message: 'Internal server error' };
        }
    });
}
class Auth {
    static authOnly(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const data = yield authenticate(token);
                if (!data.status) {
                    // Return early, don't call next if an error occurred
                    return res.status(401).json({ message: data.message });
                }
                console.log('data', data);
                req.user = data.user;
                console.log("GOTO NEXT >>>>>>><<<<<<<<<<<<<<");
                next();
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error in Authentication Only', error: err });
            }
        });
    }
    static superAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const data = yield authenticate(token);
                if (!data.status) {
                    return res.status(401).json({ message: data.message });
                }
                if (data.user.role !== 'Super Admin' || data.user.role <= 1) {
                    return res.status(403).json({ message: 'Unauthorized' });
                }
                req.user = data.user;
                next();
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error in Authentication Super Admin' });
            }
        });
    }
    static admin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                const data = yield authenticate(token);
                if (!data.status) {
                    return res.status(401).json({ message: data.message });
                }
                if (data.user.role !== 'Admin' || data.user.role <= 1) {
                    return res.status(403).json({ message: 'Unauthorized' });
                }
                req.user = data.user;
                next();
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error in Authentication Admin' });
            }
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map