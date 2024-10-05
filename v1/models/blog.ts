import { Model, DataTypes, Sequelize } from 'sequelize';

interface BlogAttributes {
  image: string;
  title: string;
  createAt: Date;
  category: string;
  author: string;
  description: string;
}

class Blog extends Model<BlogAttributes> implements BlogAttributes {
  public image!: string;
  public title!: string;
  public createAt!: Date;
  public category!: string;
  public author!: string;
  public description!: string;

  static associate(models: any) {
    // define association here
  }
}

export default (sequelize: Sequelize) => {
  Blog.init(
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      createAt: DataTypes.DATE,
      category: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Blog',
    }
  );

  return Blog;
};