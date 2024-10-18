"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./v1/routes/routes"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
(0, dotenv_1.configDotenv)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/api/v1', (req, res) => {
    res.send('Hello World! V1');
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api/v1", routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map