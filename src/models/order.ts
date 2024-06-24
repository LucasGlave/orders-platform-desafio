import { DataTypes, Model } from 'sequelize';
import db from '../config/database';
import Client from './client';
import Commerce from './commerce';
import DeliveryMan from './deliveryMan';

class Order extends Model {
  declare estado: string;
  declare fecha_creacion: Date;
  declare fecha_entrega: Date;

}

Order.init(
  {
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: 'id',
      },
    },
    comercio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Commerce,
        key: 'id',
      },
    },
    repartidor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: DeliveryMan,
        key: 'id',
      },
    },
    detalle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
    },
    fecha_entrega: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    modelName: 'pedidos',
    timestamps: false,
  }
);

export default Order;
