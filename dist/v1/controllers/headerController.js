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
const Header = models_1.default.Header;
class HeaderController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description } = req.body;
                const cloudinaryUrls = req.body.cloudinaryUrls;
                if (cloudinaryUrls.length === 0) {
                    console.error("No Cloudinary URLs found.");
                    res.status(500).send("Internal Server Error");
                    return;
                }
                const image = cloudinaryUrls[0];
                console.log(req.body, "<<<<<<<<<<<<<<<<<<");
                const header = yield Header.create({ image, title, description });
                res.status(201).json({ message: "Header created successfully" });
            }
            catch (error) {
                console.log(error);
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
                const header = yield Header.findAll();
                /*
                const filteredHeaders = header.map((h: any) => {
                  return {
                    id: h.id,
                    image: h.image,
                    title: h.title,
                    description: h.description,
                  };
                });
                */
                console.log(header, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
                res.status(200).json(header);
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
                const header = yield Header.findByPk(req.params.id);
                res.status(200).json(header);
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
                const { title, description } = req.body;
                const data = { title, description };
                const cloudinaryUrls = req.body.cloudinaryUrls;
                if ((cloudinaryUrls === null || cloudinaryUrls === void 0 ? void 0 : cloudinaryUrls.length) === 0) {
                    console.error("No Cloudinary URLs found.");
                    res.status(500).send("Internal Server Error");
                    return;
                }
                if (cloudinaryUrls) {
                    data["image"] = cloudinaryUrls[0];
                }
                console.log(req.params.id, "<<<<<<<<<<", data, "<<<<<<<<", req.body);
                yield Header.update(data, { where: { id: req.params.id } });
                res.status(200).json({ message: "Header updated successfully" });
            }
            catch (error) {
                console.log(error);
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
                yield Header.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: "Header deleted successfully" });
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
exports.default = HeaderController;
