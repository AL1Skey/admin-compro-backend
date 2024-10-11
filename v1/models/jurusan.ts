import { Model, DataTypes, Sequelize } from 'sequelize';

interface JurusanAttributes {
  name: string;
}

class Jurusan extends Model<JurusanAttributes> {
  public name!: string;

  public static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Jurusan.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Jurusan',
    }
  );

  return Jurusan;
};