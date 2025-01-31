"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Pengurus extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Pengurus.init({
        image: sequelize_1.DataTypes.STRING,
        name: sequelize_1.DataTypes.STRING,
        position: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
        phone: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        facebook: sequelize_1.DataTypes.STRING,
        instagram: sequelize_1.DataTypes.STRING,
        twitter: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Pengurus',
    });
    return Pengurus;
};
//# sourceMappingURL=pengurus.js.map