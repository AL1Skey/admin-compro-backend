import { Model, DataTypes, Sequelize } from 'sequelize';

interface CategoryAttributes {
  name: string;
}

class Category extends Model<CategoryAttributes> {
  public readonly id!: number;
  public name!: string;

  public static associate(models: any): void {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );

  return Category;
};