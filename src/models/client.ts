import { Model, DataTypes } from 'sequelize';
import db from '../config/database';

class Client extends Model {}

Client.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'clientes',
    timestamps: false,
  }
);

export default Client;
