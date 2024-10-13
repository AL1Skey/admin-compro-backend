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
const Blog = models_1.default.Blog;
class BlogController {
    static create(req, res) {
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
                data.createAt = new Date(data.createAt);
                const blog = yield Blog.create(data);
                res.status(201).json({ message: 'Blog created successfully' });
                return;
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog.findAll();
                let result;
                const formattedBlogs = blog.map((b) => {
                    const formattedData = Object.assign({}, b.dataValues);
                    if (formattedData.createAt instanceof Date) {
                        formattedData.createAt = formattedData.createAt.toDateString();
                    }
                    return formattedData;
                });
                if (req.query) {
                    if (req.query.reformat) {
                        result = formattedBlogs.map((item) => {
                            return {
                                id: item.id,
                                title: item.title,
                                img: item.image,
                                category: item.category,
                                author: item.author,
                                date: new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                                content: item.description,
                            };
                        });
                    }
                }
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(200).json(formattedBlogs);
                }
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
                const blog = yield Blog.findByPk(req.params.id);
                let result;
                if (req.query) {
                    if (req.query.reformat) {
                        result = {
                            id: blog.id,
                            title: blog.title,
                            img: blog.image,
                            category: blog.category,
                            author: blog.author,
                            date: new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                            content: blog.description,
                        };
                    }
                }
                blog.createAt = blog.createAt.toDateString();
                if (result) {
                    res.status(200).json(result);
                }
                else {
                    res.status(200).json(blog);
                }
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
                if (data.createAt) {
                    data.createAt = new Date(data.createAt);
                }
                yield Blog.update(req.body, { where: { id: req.params.id } });
                res.status(200).json({ message: 'Blog updated successfully' });
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
                yield Blog.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: 'Blog deleted successfully' });
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
exports.default = BlogController;
