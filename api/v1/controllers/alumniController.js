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
const Alumni = models_1.default.Alumni;
const Jurusan = models_1.default.Jurusan;
function convertAlumniData(data) {
    const groupedByAngkatan = data.reduce((result, item) => {
        // Group by "angkatan"
        if (!result[item.angkatan]) {
            result[item.angkatan] = { angkatan: item.angkatan, total: 0, alumni: [] };
        }
        // Find or create jurusan group
        let jurusanGroup = result[item.angkatan].alumni.find((j) => j.Jurusan === item.jurusan);
        if (!jurusanGroup) {
            jurusanGroup = { Jurusan: item.jurusan, [item.jurusan]: [], total: 0 };
            result[item.angkatan].alumni.push(jurusanGroup);
        }
        // Add alumni name to the corresponding jurusan
        jurusanGroup[item.jurusan].push(item.name.trim());
        jurusanGroup.total += 1;
        // Increment total for angkatan
        result[item.angkatan].total += 1;
        return result;
    }, {});
    // Convert the grouped data to an array
    return Object.values(groupedByAngkatan);
}
class AlumniController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, image, phone, jobs, company, angkatan, jurusan, approval, isShown, } = req.body;
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
                data["approval"] = data["approval"]
                    ? !!parseInt(data["approval"])
                    : false;
                data["isShown"] = data["isShown"] ? !!parseInt(data["isShown"]) : false;
                // Check if name already exists in the database (case insensitive)
                const alumni = yield Alumni.create(data);
                res.status(201).json({ message: "Alumni created successfully" });
                return;
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error", error });
                return;
            }
        });
    }
    static getAllAngkatan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const angkatanList = yield Alumni.findAll({
                    attributes: [
                        [
                            models_1.default.sequelize.fn("DISTINCT", models_1.default.sequelize.col("angkatan")),
                            "angkatan",
                        ],
                    ],
                    order: [["angkatan", "DESC"]],
                });
                res.status(200).json(angkatanList.map((item) => item.angkatan));
                return;
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error", error });
                return;
            }
        });
    }
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Alumni) {
                    throw new Error("Alumni model is not defined");
                }
                let condition = {};
                let pages = 0;
                let limit = 25;
                if (req.query) {
                    let query = [];
                    if (req.query.approval) {
                        query.push({ approval: req.query.approval === "true" });
                    }
                    if (req.query.angkatan) {
                        query.push({ angkatan: req.query.angkatan });
                    }
                    else {
                        query.push({ angkatan: { [sequelize_1.default.Op.ne]: "" } });
                    }
                    if (req.query.isShown) {
                        query.push({ isShown: req.query.isShown === "true" });
                    }
                    if (req.query.pages) {
                        pages = parseInt(req.query.pages);
                    }
                    if (req.query.limit) {
                        limit = parseInt(req.query.limit);
                    }
                    if (req.query.offset) {
                        if (req.query.offset === "false") {
                            pages = 0;
                        }
                    }
                    condition["limit"] = limit;
                    condition["offset"] = pages * limit;
                    // condition['attributes'] = [ [db.sequelize.fn('DISTINCT', db.sequelize.col('name')),'name'],'id' ,'email', 'image', 'phone', 'jobs', 'angkatan', 'jurusan', 'approval', 'isShown'];
                    query.push({ name: { [sequelize_1.default.Op.ne]: "" } });
                    query.push({ angkatan: { [sequelize_1.default.Op.ne]: "" } });
                    query.push({ jurusan: { [sequelize_1.default.Op.ne]: "" } });
                    condition["where"] = { [sequelize_1.default.Op.and]: query };
                }
                condition["order"] = [["updatedAt", "DESC"]];
                const response = yield Alumni.findAll(condition);
                let alumni = response
                    ? yield Promise.all(response === null || response === void 0 ? void 0 : response.map((alumnus) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const formattedData = Object.assign({}, alumnus.dataValues);
                        console.log(formattedData);
                        const jurusan = yield Jurusan.findByPk(formattedData.jurusan);
                        return {
                            id: formattedData.id,
                            name: formattedData.name,
                            email: formattedData.email,
                            image: formattedData.image,
                            phone: formattedData.phone,
                            jobs: formattedData.jobs,
                            angkatan: formattedData.angkatan,
                            jurusan: (_a = jurusan === null || jurusan === void 0 ? void 0 : jurusan.name) !== null && _a !== void 0 ? _a : formattedData.jurusan,
                            approval: formattedData.approval,
                            isShown: formattedData.isShown,
                        };
                    })))
                    : [];
                console.log(alumni);
                let result;
                if ((alumni === null || alumni === void 0 ? void 0 : alumni.length) === 0 || alumni === null) {
                    res.status(200).json([]);
                    return;
                }
                if (req.query) {
                    if (req.query.reformat) {
                        const groupedData = alumni.reduce((acc, current) => {
                            const angkatan = current.angkatan;
                            if (!acc[angkatan]) {
                                acc[angkatan] = [];
                            }
                            acc[angkatan].push(current);
                            return acc;
                        }, {});
                        result = Object.keys(groupedData)
                            .sort((a, b) => parseInt(b, 10) - parseInt(a, 10)) // Sort by angkatan descending
                            .map((angkatan) => {
                            const alumnus = groupedData[angkatan];
                            const total = alumnus.length;
                            const jurusan = alumnus.reduce((acc, current) => {
                                const jurusanName = current.jurusan;
                                if (!acc[jurusanName]) {
                                    acc[jurusanName] = {
                                        Jurusan: jurusanName,
                                        Alumni: [],
                                        total: 0,
                                    };
                                }
                                acc[jurusanName].Alumni.push(current.name);
                                acc[jurusanName].total++;
                                return acc;
                            }, {});
                            return {
                                angkatan: parseInt(angkatan, 10),
                                total,
                                alumni: Object.values(jurusan),
                            };
                        });
                    }
                }
                if (result) {
                    res.status(200).json(result);
                    return;
                }
                res.status(200).json(alumni);
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error", error });
                return;
            }
        });
    }
    static getAllByAngkatan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Alumni) {
                    throw new Error("Alumni model is not defined");
                }
                let pages = 0;
                let offset = 5;
                // Get Angkatan list
                let angkatanList = yield Alumni.findAll({
                    attributes: [
                        [
                            models_1.default.sequelize.fn("DISTINCT", models_1.default.sequelize.col("angkatan")),
                            "angkatan",
                        ],
                    ],
                    order: [["angkatan", "DESC"]],
                });
                angkatanList = angkatanList.map((item) => {
                    if ((item === null || item === void 0 ? void 0 : item.angkatan) > 0) {
                        return item.angkatan;
                    }
                });
                // Start Condition
                let condition = {};
                if (req.query) {
                    let query = [];
                    if (req.query.approval) {
                        query.push({ approval: req.query.approval === "true" });
                    }
                    if (req.query.isShown) {
                        query.push({ isShown: req.query.isShown === "true" });
                    }
                    if (req.query.pages) {
                        pages = parseInt(req.query.pages);
                    }
                    query.push({ angkatan: { [sequelize_1.default.Op.and]: {
                                [sequelize_1.default.Op.lte]: angkatanList[(pages * offset)],
                                [sequelize_1.default.Op.gt]: angkatanList[(pages * offset) + 5]
                            }
                        } });
                    query.push({ name: { [sequelize_1.default.Op.ne]: "" } });
                    query.push({ jurusan: { [sequelize_1.default.Op.ne]: "" } });
                    condition["where"] = { [sequelize_1.default.Op.and]: query };
                }
                condition["order"] = [["angkatan", "DESC"]];
                const response = yield Alumni.findAll(condition);
                let alumni = response
                    ? yield Promise.all(response === null || response === void 0 ? void 0 : response.map((alumnus) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        const formattedData = Object.assign({}, alumnus.dataValues);
                        console.log(formattedData);
                        const jurusan = yield Jurusan.findByPk(formattedData.jurusan);
                        return {
                            id: formattedData.id,
                            name: formattedData.name,
                            email: formattedData.email,
                            image: formattedData.image,
                            phone: formattedData.phone,
                            jobs: formattedData.jobs,
                            angkatan: formattedData.angkatan,
                            jurusan: (_a = jurusan === null || jurusan === void 0 ? void 0 : jurusan.name) !== null && _a !== void 0 ? _a : formattedData.jurusan,
                            approval: formattedData.approval,
                            isShown: formattedData.isShown,
                        };
                    })))
                    : [];
                console.log(alumni);
                let result;
                if ((alumni === null || alumni === void 0 ? void 0 : alumni.length) === 0 || alumni === null) {
                    res.status(200).json([]);
                    return;
                }
                if (req.query) {
                    if (req.query.reformat) {
                        const groupedData = alumni.reduce((acc, current) => {
                            const angkatan = current.angkatan;
                            if (!acc[angkatan]) {
                                acc[angkatan] = [];
                            }
                            acc[angkatan].push(current);
                            return acc;
                        }, {});
                        result = Object.keys(groupedData)
                            .sort((a, b) => parseInt(b, 10) - parseInt(a, 10)) // Sort by angkatan descending
                            .map((angkatan) => {
                            const alumnus = groupedData[angkatan];
                            const total = alumnus.length;
                            const jurusan = alumnus.reduce((acc, current) => {
                                const jurusanName = current.jurusan;
                                if (!acc[jurusanName]) {
                                    acc[jurusanName] = {
                                        Jurusan: jurusanName,
                                        Alumni: [],
                                        total: 0,
                                    };
                                }
                                acc[jurusanName].Alumni.push(current.name);
                                acc[jurusanName].total++;
                                return acc;
                            }, {});
                            return {
                                angkatan: parseInt(angkatan, 10),
                                total,
                                alumni: Object.values(jurusan),
                            };
                        });
                    }
                }
                if (result) {
                    res.status(200).json(result);
                    return;
                }
                res.status(200).json(alumni);
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error", error });
                return;
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alumni = yield Alumni.findByPk(req.params.id);
                res.status(200).json(alumni);
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const cloudinaryUrls = req.body.cloudinaryUrls;
                console.log(req.body, "update");
                // Check if there are any Cloudinary URLs
                if ((cloudinaryUrls === null || cloudinaryUrls === void 0 ? void 0 : cloudinaryUrls.length) === 0) {
                    console.error("No Cloudinary URLs found.");
                    throw new Error("No Cloudinary URLs found.");
                }
                if (cloudinaryUrls) {
                    data["image"] = cloudinaryUrls[0];
                }
                // Check if approval is a number
                let hasNumbers = /\d/.test(data["approval"]);
                if (hasNumbers) {
                    data["approval"] = !!parseInt(data["approval"]);
                }
                else {
                    console.log(typeof data["approval"], "approval tipe data");
                }
                if (data["isShown"]) {
                    data["isShown"] = !!parseInt(data["isShown"]);
                }
                data["updatedAt"] = new Date();
                console.log(data);
                yield Alumni.update(data, { where: { id: req.params.id } });
                res.status(200).json({ message: "Alumni updated successfully" });
                return;
            }
            catch (error) {
                console.log("Error", error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Deleting alumni");
                yield Alumni.destroy({ where: { id: req.params.id } });
                console.log("Alumni deleted successfully");
                res.status(200).json({ message: "Alumni deleted successfully" });
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
    static bulkDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                for (let i = 0; i < id.length; i++) {
                    yield Alumni.destroy({ where: { id: id[i] } });
                }
                res.status(200).json({ message: "Alumni deleted successfully" });
                return;
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
    static alumniRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                data["approval"] = false;
                const check = yield Alumni.findOne({
                    where: { name: data === null || data === void 0 ? void 0 : data.name, angkatan: data === null || data === void 0 ? void 0 : data.angkatan, jurusan: data === null || data === void 0 ? void 0 : data.jurusan, approval: false },
                });
                let response;
                const existingAlumni = yield Alumni.findOne({
                    where: sequelize_1.default.where(sequelize_1.default.fn('LOWER', sequelize_1.default.col('name')), sequelize_1.default.fn('LOWER', data['name'].trim()))
                });
                if (existingAlumni) {
                    console.log("Name already exists");
                    console.log(existingAlumni);
                    res.status(200).json({ message: "Nama sudah terdaftar" });
                    return;
                }
                if (check) {
                    response = yield Alumni.update(Object.assign(Object.assign({}, data), { updatedAt: new Date() }), { where: { id: check.id } });
                }
                else {
                    response = yield Alumni.create(data);
                }
                if (response) {
                    res
                        .status(201)
                        .json({ message: "Alumni request created successfully" });
                    return;
                }
            }
            catch (error) {
                res.status(505).json({ message: "Internal Server Error", error });
                return;
            }
        });
    }
    static approve(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Alumni.update({ approval: true }, { where: { id: req.params.id } });
                res.status(200).json({ message: "Alumni approved successfully" });
                return;
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
    static reject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Alumni.update({ approval: false }, { where: { id: req.params.id } });
                res.status(200).json({ message: "Alumni rejected successfully" });
                return;
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        });
    }
    static checkName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("MASIUKKK");
                const { name } = req.body;
                console.log(name);
                const check = yield Alumni.findOne({ where: { name } });
                console.log("CHECKKED");
                if (check) {
                    res.status(200).json({ message: "Name already exist" });
                    return;
                }
                res.status(200).json({ safe: true });
                return;
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error", error });
                return;
            }
        });
    }
}
exports.default = AlumniController;
//# sourceMappingURL=alumniController.js.map