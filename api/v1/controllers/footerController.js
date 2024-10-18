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
const Footer = models_1.default.Footer;
class FooterController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, phone, email, facebook, instagram, twitter } = req.body;
                const footer = yield Footer.create({
                    address,
                    phone,
                    email,
                    facebook,
                    instagram,
                    twitter,
                });
                res.status(201).json({ message: "Footer created successfully" });
            }
            catch (err) {
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                return;
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const footer = yield Footer.findAll();
                res.status(200).json(footer);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                return;
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const footer = yield Footer.findByPk(req.params.id);
                res.status(200).json(footer);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                return;
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const footer = yield Footer.findOne();
                res.status(200).json(footer);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                return;
            }
        });
    }
    static updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const footer = yield Footer.findOne();
                console.log(footer === null || footer === void 0 ? void 0 : footer.id, "FOOOTERIIIIDDD");
                console.log(req.body);
                if (!footer) {
                    yield Footer.create(req.body);
                    res.status(201).json({ message: "Footer One created successfully" });
                    return;
                }
                yield Footer.update(req.body, { where: { id: footer.id } });
                res.status(200).json({ message: "Footer One updated successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                console.log("finally");
                return;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Footer.update(req.body, { where: { id: req.params.id } });
                res.status(200).json({ message: "Footer updated successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                return;
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Footer.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: "Footer deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                return;
            }
        });
    }
}
exports.default = FooterController;
//# sourceMappingURL=footerController.js.map