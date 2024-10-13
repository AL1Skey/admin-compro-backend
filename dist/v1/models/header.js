"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Header extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Header.init({
        image: sequelize_1.DataTypes.STRING,
        title: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Header',
    });
    return Header;
};
//# sourceMappingURL=header.js.map