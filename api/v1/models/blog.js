"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Blog extends sequelize_1.Model {
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Blog.init({
        image: sequelize_1.DataTypes.STRING,
        title: sequelize_1.DataTypes.STRING,
        createAt: sequelize_1.DataTypes.DATE,
        category: sequelize_1.DataTypes.STRING,
        author: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Blog',
    });
    return Blog;
};
//# sourceMappingURL=blog.js.map