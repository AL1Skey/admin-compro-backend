"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Alumni extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Alumni.init({
        name: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        image: sequelize_1.DataTypes.STRING,
        phone: sequelize_1.DataTypes.STRING,
        jobs: sequelize_1.DataTypes.STRING,
        angkatan: sequelize_1.DataTypes.INTEGER,
        jurusan: sequelize_1.DataTypes.INTEGER,
        approval: sequelize_1.DataTypes.BOOLEAN,
        isShown: sequelize_1.DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Alumni',
    });
    return Alumni;
};
//# sourceMappingURL=alumni.js.map