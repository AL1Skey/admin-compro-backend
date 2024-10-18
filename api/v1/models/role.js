"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
exports.default = (sequelize) => {
    Role.init({
        name: sequelize_1.DataTypes.STRING,
        value: sequelize_1.DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};
//# sourceMappingURL=role.js.map