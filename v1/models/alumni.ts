import { Model, DataTypes, Sequelize } from 'sequelize';

interface AlumniAttributes {
  name: string;
  email: string;
  image: string;
  phone: string;
  jobs: string;
  angkatan: string;
  jurusan: string;
  approval: boolean;
}

class Alumni extends Model<AlumniAttributes> {
  public readonly id!: number;
  public name!: string;
  public email!: string;
  public image!: string;
  public phone!: string;
  public jobs!: string;
  public angkatan!: string;
  public jurusan!: string;
  public approval!: boolean;

  public static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Alumni.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      phone: DataTypes.STRING,
      jobs: DataTypes.STRING,
      angkatan: DataTypes.INTEGER,
      jurusan: DataTypes.STRING,
      approval: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Alumni',
    }
  );

  return Alumni;
};