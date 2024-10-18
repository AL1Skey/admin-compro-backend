"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const XLSX = __importStar(require("xlsx"));
function capitalizeFirstLetter(str) {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
class ExcelController {
    static uploadAlumni(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let table;
                if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.data)) {
                    res.status(400).json({ message: "No file found" });
                    return;
                }
                const tablename = `Alumni`;
                if (!tablename) {
                    res.status(400).json({ message: "No table name found" });
                    return;
                }
                table = models_1.default[tablename];
                if (!table) {
                    res.status(400).json({ message: "Table not found" });
                    return;
                }
                // Map Excel data to Sequelize model fields
                const mappedData1 = req.body.data.slice(2).map((row) => ({
                    Nama: row["D"] || "",
                    Jurusan: row["G"] || "",
                    Angkatan: row["I"] || "",
                    "Nama Perusahaan": row["L"] || "",
                    Jabatan: row["N"] || "",
                    Remarks: row["O"] || "",
                    email: row["P"] || "",
                }));
                console.log(mappedData1[0], "MApped Data");
                console.log(mappedData1.length);
                // Filter out any rows where all fields are empty or null
                const filteredData = mappedData1.filter((row) => Object.values(row).some((value) => value !== "" && value !== null));
                console.log(filteredData[0], "Filtered Data");
                // Inside the mappedData Promise.all function
                const mappedData = yield Promise.all(filteredData.map((row) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let rowJurusan = row.Jurusan.toUpperCase(); // Normalize case
                        let jurusan;
                        // Use findOrCreate to avoid duplicates
                        [jurusan] = yield models_1.default.Jurusan.findOrCreate({
                            where: {
                                name: rowJurusan,
                            },
                            defaults: {
                                name: rowJurusan, // This will only be used if a new record is created
                            },
                        });
                        console.log(jurusan);
                        return {
                            name: row.Nama,
                            email: row.email,
                            phone: row.Remarks,
                            jobs: row.Jabatan,
                            company: row["Nama Perusahaan"],
                            angkatan: row.Angkatan,
                            jurusan: `${jurusan.id}`, // Assuming jurusan is not null
                            approval: true,
                            isShown: false,
                        };
                    }
                    catch (error) {
                        console.log(error);
                    }
                })));
                // console.log(mappedData);
                // Create new records in the database
                yield table.bulkCreate(mappedData);
                console.log("Upload Excel");
                res.status(200).json({ message: "Upload Excel" });
                return;
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error", error });
                return;
            }
        });
    }
    static downloadAlumni(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let table;
                const tablename = `Alumni`;
                if (!tablename) {
                    res.status(400).json({ message: "No table name found" });
                    return;
                }
                // Get the table model from the database
                table = models_1.default[tablename];
                if (!table) {
                    res.status(400).json({ message: "Table not found" });
                    return;
                }
                // Fetch all records from the table
                const data = yield table.findAll();
                if (!data.length) {
                    res.status(404).json({ message: "No data found" });
                    return;
                }
                // Get the field names
                const fields = Object.keys(data[0].dataValues);
                const alumni = yield Promise.all(data === null || data === void 0 ? void 0 : data.map((alumnus) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const formattedData = Object.assign({}, alumnus.dataValues);
                    console.log(formattedData);
                    const jurusan = yield models_1.default.Jurusan.findByPk(formattedData.jurusan);
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
                })));
                // Prepare the data for Excel
                const excelData = data.map((row, index) => {
                    const rowData = {};
                    fields.forEach((field) => {
                        if (field === "jurusan") {
                            // Assuming `jurusan` is a related model with a `name` field
                            rowData[field] = row[field] ? row[field].name : null;
                        }
                        else if (field === "id") {
                            rowData[field] = index + 1;
                        }
                        else if (["createdAt", "updatedAt"].includes(field)) {
                            rowData[field] = row[field].toISOString().substr(0, 10);
                        }
                        else {
                            rowData[field] = row[field];
                        }
                    });
                    return rowData;
                });
                // Create a new workbook and add a sheet with the data
                const worksheet = XLSX.utils.json_to_sheet(excelData);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Alumni");
                // Create a buffer for the Excel file
                const excelBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
                // Send the file as an attachment
                res.setHeader("Content-disposition", "attachment; filename=alumni.xlsx");
                res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.status(200).send(excelBuffer);
                return;
            }
            catch (error) {
                console.error("Error downloading data:", error);
                res.status(500).json({ message: "Internal server error", error });
            }
        });
    }
}
exports.default = ExcelController;
//# sourceMappingURL=excelController.js.map