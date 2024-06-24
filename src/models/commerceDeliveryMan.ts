import { DataTypes, Model } from 'sequelize'
import db from '../config/database'
import Commerce from './commerce'
import DeliveryMan from './deliveryMan'

class CommerceDeliveryMan extends Model {}

CommerceDeliveryMan.init({
  comercio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Commerce,
      key: 'id'
    }
  },
  repartidor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DeliveryMan,
      key: 'id'
    }
  }
}, {
  sequelize: db,
  modelName: 'comerciosRepartidores',
  timestamps: false
})

export default CommerceDeliveryMan
