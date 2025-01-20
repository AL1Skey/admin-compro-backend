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
const sequelize_1 = __importDefault(require("sequelize"));
const Karir = models_1.default.Karir;
class KarirController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image, end_date, title, description, email } = req.body;
                const data = req.body;
                const cloudinaryUrls = req.body.cloudinaryUrls;
                // Check if there are any Cloudinary URLs
                if ((cloudinaryUrls === null || cloudinaryUrls === void 0 ? void 0 : cloudinaryUrls.length) === 0) {
                    console.error("No Cloudinary URLs found.");
                    throw new Error("No Cloudinary URLs found.");
                }
                if (cloudinaryUrls) {
                    data["image"] = cloudinaryUrls[0];
                }
                data.end_date = new Date(data.end_date);
                const karir = yield Karir.create(data);
                res.status(201).json({ message: "Karir created successfully" });
            }
            catch (error) {
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
                const query = [];
                let karir;
                if (req.query.skip) {
                    query.push({ end_date: { [sequelize_1.default.Op.gte]: new Date() } });
                    karir = yield Karir.findAll({
                        where: query
                    });
                }
                else {
                    karir = yield Karir.findAll();
                }
                const formattedKarir = karir ? karir.map((b) => {
                    const formattedData = Object.assign({}, b.dataValues);
                    if (formattedData.end_date instanceof Date) {
                        formattedData.end_date = formattedData.end_date.toDateString();
                    }
                    return formattedData;
                }) : [];
                res.status(200).json(formattedKarir);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error In COntroller", error });
            }
            finally {
                return;
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const karir = yield Karir.findByPk(req.params.id);
                karir.end_date = karir.end_date.toDateString();
                res.status(200).json(karir);
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
            finally {
                return;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image, end_date, title, description, email } = req.body;
                const data = req.body;
                const cloudinaryUrls = req.body.cloudinaryUrls;
                // Check if there are any Cloudinary URLs
                if ((cloudinaryUrls === null || cloudinaryUrls === void 0 ? void 0 : cloudinaryUrls.length) === 0) {
                    console.error("No Cloudinary URLs found.");
                    throw new Error("No Cloudinary URLs found.");
                }
                if (cloudinaryUrls) {
                    data["image"] = cloudinaryUrls[0];
                }
                if (data.end_date) {
                    data.end_date = new Date(data.end_date);
                }
                yield Karir.update(data, { where: { id: req.params.id } });
                res.status(200).json({ message: "Karir updated successfully" });
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
                yield Karir.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: "Karir deleted successfully" });
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
exports.default = KarirController;
//# sourceMappingURL=karirController.js.map