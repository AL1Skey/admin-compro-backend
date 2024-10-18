"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Karir extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Karir.init({
        image: sequelize_1.DataTypes.STRING,
        end_date: sequelize_1.DataTypes.DATE,
        title: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Karir',
    });
    return Karir;
};
//# sourceMappingURL=karir.js.map