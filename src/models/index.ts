import Client from './client'
import Commerce from './commerce'
import DeliveryMan from './deliveryMan'
import Order from './order'
import CommerceDeliveryMan from './commerceDeliveryMan'
import db from '../config/database'

Commerce.belongsToMany(DeliveryMan, { through: CommerceDeliveryMan }) 
DeliveryMan.belongsToMany(Commerce, { through: CommerceDeliveryMan }) 
Commerce.hasMany(Order, { foreignKey: 'comercio_id' }) 
Client.hasMany(Order, { foreignKey: 'cliente_id' }) 
DeliveryMan.hasMany(Order, { foreignKey: 'repartidor_id' }) 
Order.belongsTo(Commerce, { foreignKey: 'comercio_id' })
Order.belongsTo(Client, { foreignKey: 'cliente_id' }) 
Order.belongsTo(DeliveryMan, { foreignKey: 'repartidor_id' }) 

export default db
