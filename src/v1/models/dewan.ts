import { Model, DataTypes, Sequelize } from 'sequelize';

interface DewanAttributes {
  image: string;
  name: string;
  position: string;
  description: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

class Dewan extends Model<DewanAttributes> {
  public image!: string;
  public name!: string;
  public position!: string;
  public description!: string;
  public phone!: string;
  public email!: string;
  public facebook!: string;
  public instagram!: string;
  public twitter!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Dewan.init(
    {
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      position: DataTypes.STRING,
      description: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      facebook: DataTypes.STRING,
      instagram: DataTypes.STRING,
      twitter: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Dewan',
    }
  );

  return Dewan;
};