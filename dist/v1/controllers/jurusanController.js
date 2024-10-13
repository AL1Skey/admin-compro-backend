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
const Jurusan = models_1.default.Jurusan;
class JurusanController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const jurusan = yield Jurusan.create(data);
                res.status(201).json({ message: 'Jurusan created successfully' });
                return;
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
                return;
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Jurusan) {
                    throw new Error('Jurusan model is not defined');
                }
                const jurusan = yield Jurusan.findAll();
                if (jurusan.length === 0 || jurusan === null) {
                    res.status(404).json([]);
                    return;
                }
                res.status(200).json(jurusan);
                return;
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
                return;
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Jurusan) {
                    throw new Error('Jurusan model is not defined');
                }
                const jurusan = yield Jurusan.findByPk(req.params.id);
                if (jurusan === null) {
                    res.status(404).json({ message: 'Jurusan not found' });
                    return;
                }
                res.status(200).json(jurusan);
                return;
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
                return;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Jurusan) {
                    throw new Error('Jurusan model is not defined');
                }
                const data = req.body;
                const jurusan = yield Jurusan.findByPk(req.params.id);
                if (jurusan === null) {
                    res.status(404).json({ message: 'Jurusan not found' });
                    return;
                }
                yield Jurusan.update(data, { where: { id: req.params.id } });
                res.status(200).json({ message: 'Jurusan updated successfully' });
                return;
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
                return;
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Jurusan) {
                    throw new Error('Jurusan model is not defined');
                }
                yield Jurusan.destroy({ where: { id: req.params.id } });
                res.status(200).json({ message: 'Jurusan deleted successfully' });
                return;
            }
            catch (error) {
                res.status(500).json({ message: 'Internal server error', error });
                return;
            }
        });
    }
}
exports.default = JurusanController;
//# sourceMappingURL=jurusanController.js.map