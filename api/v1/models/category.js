"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Category.init({
        name: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};
//# sourceMappingURL=category.js.map