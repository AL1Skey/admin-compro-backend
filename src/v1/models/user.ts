import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  name: string;
  email: string;
  password: string;
  role: string;
}

class User extends Model<UserAttributes> {
  public name!: string;
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
      name: DataTypes.STRING,
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