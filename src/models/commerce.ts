import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

class Commerce extends Model {
  declare max_pedidos: number;
}

Commerce.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    max_pedidos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'comercios',
    timestamps: false,
  }
);

export default Commerce;
