import { Model, DataTypes, Sequelize } from 'sequelize';

interface FooterAttributes {
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
}

class Footer extends Model<FooterAttributes> {
  public address!: string;
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
  Footer.init(
    {
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      facebook: DataTypes.STRING,
      instagram: DataTypes.STRING,
      twitter: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Footer',
    }
  );

  return Footer;
};