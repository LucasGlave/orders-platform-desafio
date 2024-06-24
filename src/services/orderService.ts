import { Op } from 'sequelize';
import Commerce from '../models/commerce';
import Order from '../models/order';

interface OrderModel {
  detalle: string;
  cliente_id: number;
  comercio_id: number;
  repartidor_id: number;
}

const getAllOrders = async (page: number, limit: number): Promise<Order[]> => {
  const offset = (page - 1) * limit;
  return await Order.findAll({ offset, limit });
};

const getOrderById = async (id: number): Promise<Order | null> => {
  return await Order.findByPk(id);
};

const createOrder = async ({ detalle, cliente_id, comercio_id, repartidor_id }: OrderModel) => {
  const arrayOrders = await Order.findAll({
    where: {
      comercio_id,
      estado: {
        [Op.in]: ['preparado', 'en_curso'],
      },
    },
  });
  const comercio = await Commerce.findByPk(comercio_id);
  if (!comercio) throw new Error('Commerce not found');
  if (arrayOrders.length < comercio.max_pedidos) {
    const fecha_creacion = new Date();
    const fecha_entrega = new Date(fecha_creacion.getTime() + 30 * 60000);
    return await Order.create({
      detalle,
      cliente_id,
      comercio_id,
      repartidor_id,
      estado: 'preparado',
      fecha_creacion,
      fecha_entrega,
    });
  } else throw new Error('the commerce is not accepting any more orders');
};

const updateOrder = async (id: number, orderData: Partial<OrderModel>): Promise<Order | null> => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');
  if (order.estado !== 'preparado') throw new Error('Cannot update order in current state');
  return await order.update(orderData);
};

const deleteOrder = async (id: number): Promise<void> => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');
  await order.destroy();
};

const changeOrderStatus = async (id: number, change: boolean) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Order not found');
  const currentStatus = order.estado;
  let newStatus = '';
  if (!change) {
    newStatus = 'cancelado';
  } else {
    switch (currentStatus) {
      case 'preparado':
        newStatus = 'en_curso';
        break;
      case 'en_curso':
        newStatus = 'entregado';
        break;
      case 'entregado':
        throw new Error('Order is completed');
      case 'cancelado':
        throw new Error('Order is completed');
      default:
        throw new Error('Invalid order state');
    }
  }
  order.estado = newStatus;
  return await order.save();
};

const getStateOrders = async (estado: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return await Order.findAndCountAll({ where: { estado }, limit, offset });
};

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
  getStateOrders,
};