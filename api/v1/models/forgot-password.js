"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
'use strict';
exports.default = (sequelize) => {
    class ForgotPassword extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    ForgotPassword.init({
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ForgotPassword',
    });
    return ForgotPassword;
};
//# sourceMappingURL=forgot-password.js.map