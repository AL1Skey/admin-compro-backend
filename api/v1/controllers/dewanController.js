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
const Dewan = models_1.default.Dewan;
class DewanController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { image, name, position, description, phone, email, facebook, instagram, twitter, } = req.body;
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
                const dewan = yield Dewan.create(data);
                //RESPONSE NEEED TO BE 203
                res.status(201).json({ message: "Dewan created successfully" });
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
                let condition = {};
                if (req.query) {
                    let query = [];
                    if (req.query.name) {
                        query.push({ "name": req.query.name });
                    }
                    condition["where"] = query;
                }
                const dewan = yield Dewan.findAll(condition);
                res.status(200).json(dewan);
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
                const dewan = yield Dewan.findByPk(req.params.id);
                res.status(200).json(dewan);
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
                console.log(data);
                yield Dewan.update(data, { where: { id: req.params.id } });
                res.status(203).json({ message: "Dewan updated successfully" });
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
                yield Dewan.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: "Dewan deleted successfully" });
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
exports.default = DewanController;
//# sourceMappingURL=dewanController.js.map