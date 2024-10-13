"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Footer extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Footer.init({
        address: sequelize_1.DataTypes.STRING,
        addressUrl: sequelize_1.DataTypes.STRING,
        phone: sequelize_1.DataTypes.STRING,
        email: sequelize_1.DataTypes.STRING,
        facebook: sequelize_1.DataTypes.STRING,
        instagram: sequelize_1.DataTypes.STRING,
        twitter: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Footer',
    });
    return Footer;
};
//# sourceMappingURL=footer.js.map