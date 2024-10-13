"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class AboutUs extends sequelize_1.Model {
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
    AboutUs.init({
        image: sequelize_1.DataTypes.STRING,
        title: sequelize_1.DataTypes.STRING,
        description: sequelize_1.DataTypes.STRING,
        visi: sequelize_1.DataTypes.STRING,
        misi: sequelize_1.DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AboutUs',
    });
    return AboutUs;
};
//# sourceMappingURL=aboutus.js.map