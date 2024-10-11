import { Model, DataTypes, Sequelize } from 'sequelize';

interface KarirAttributes {
  image: string;
  end_date: Date;
  title: string;
  description: string;
  email: string;
}

class Karir extends Model<KarirAttributes> implements KarirAttributes {
  public image!: string;
  public end_date!: Date;
  public title!: string;
  public description!: string;
  public email!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Karir.init(
    {
      image: DataTypes.STRING,
      end_date: DataTypes.DATE,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Karir',
    }
  );

  return Karir;
};