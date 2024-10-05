'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Options } from 'sequelize';
import process from 'process';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Extend Sequelize Options to include 'use_env_variable'
interface CustomSequelizeOptions extends Options {
  use_env_variable?: string;
}

// Import configuration for different environments
const config = require(__dirname + '/../config/config.json')[env] as CustomSequelizeOptions;

interface DbInterface {
  [key: string]: any;
  sequelize?: Sequelize;
  Sequelize?: typeof Sequelize;
}

const db: DbInterface = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
  // Use the environment variable if it exists
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  // Use the configuration from the config file
  sequelize = new Sequelize(config.database as string, config.username as string, config.password as string, config);
}

// Load all model files and add them to db object
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// If a model has an associate method, call it to set up relationships
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
