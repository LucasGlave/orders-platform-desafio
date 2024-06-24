import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

class DeliveryMan extends Model {}

DeliveryMan.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    transporte: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'repartidores',
    timestamps: false,
  }
);

export default DeliveryMan;
