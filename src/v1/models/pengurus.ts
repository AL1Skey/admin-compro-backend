import { Model, DataTypes, Sequelize } from 'sequelize';

interface PengurusAttributes {
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

class Pengurus extends Model<PengurusAttributes> {
  public readonly id!: number;
  public image!: string;
  public name!: string;
  public position!: string;
  public description!: string;
  public phone!: string;
  public email!: string;
  public facebook!: string;
  public instagram!: string;
  public twitter!: string;

  public static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Pengurus.init(
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
      modelName: 'Pengurus',
    }
  );

  return Pengurus;
};