import { Model, DataTypes, Sequelize } from 'sequelize';

interface HeaderAttributes {
  image: string;
  title: string;
  description: string;
}

class Header extends Model<HeaderAttributes> {
  public image!: string;
  public title!: string;
  public description!: string;

  public static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Header.init(
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Header',
    }
  );

  return Header;
};