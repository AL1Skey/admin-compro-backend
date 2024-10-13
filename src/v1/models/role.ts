import { Model, DataTypes, Sequelize } from 'sequelize';

interface RoleAttributes {
  name: string;
  value: number;
}

class Role extends Model<RoleAttributes> {
  public name!: string;
  public value!: number;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  public static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Role.init(
    {
      name: DataTypes.STRING,
      value: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );

  return Role;
};