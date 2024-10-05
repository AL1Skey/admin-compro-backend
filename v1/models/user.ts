import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

class User extends Model<UserAttributes> {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};