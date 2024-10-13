import { Model, DataTypes, Sequelize } from 'sequelize';

interface AboutUsAttributes {
  image: string;
  title: string;
  description: string;
  visi: string;
  misi: string;
}

class AboutUs extends Model<AboutUsAttributes> implements AboutUsAttributes {
  public image!: string;
  public title!: string;
  public description!: string;
  public visi!: string;
  public misi!: string;

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
AboutUs.init(
  {
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    visi: DataTypes.STRING,
    misi: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'AboutUs',
  }
)

  return AboutUs;
};