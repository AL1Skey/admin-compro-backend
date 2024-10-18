import { Model, DataTypes, Sequelize } from 'sequelize';

'use strict';

interface ForgotPasswordAttributes {
  email: string;
  token: string;
}

export default (sequelize: Sequelize) => {
  class ForgotPassword extends Model<ForgotPasswordAttributes> implements ForgotPasswordAttributes {
    public email!: string;
    public token!: string;

    static associate(models: any) {
      // define association here
    }
  }

  ForgotPassword.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ForgotPassword',
  });

  return ForgotPassword;
};