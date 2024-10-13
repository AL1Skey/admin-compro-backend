"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Jurusan extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Jurusan.init({
        name: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Jurusan',
    });
    return Jurusan;
};
//# sourceMappingURL=jurusan.js.map