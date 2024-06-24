import Commerce from '../models/commerce';
import Order from '../models/order';

const getAllCommerces = async (): Promise<Commerce[]> => {
  return await Commerce.findAll();
};

const getCommerceById = async (id: number): Promise<Commerce | null> => {
  return await Commerce.findByPk(+id);
};

const createCommerce = async (
  nombre: string,
  activo: boolean,
  max_pedidos: number
): Promise<Commerce> => {
  return await Commerce.create({ nombre, activo, max_pedidos });
};

const updateCommerce = async (
  id: number,
  nombre: string,
  activo: boolean,
  max_pedidos: number
): Promise<Commerce | null> => {
  const commerce = await Commerce.findByPk(+id);
  if (!commerce) throw new Error('Commerce not found');
  return await commerce.update({ nombre, activo, max_pedidos });
};

const deleteCommerce = async (id: number): Promise<void> => {
  const commerce = await Commerce.findByPk(+id);
  if (!commerce) throw new Error('Commerce not found');
  await Order.destroy({ where: { comercio_id: id } });
  await commerce.destroy();
};

const getCommerceOrders = async (comercioId: number): Promise<Order[]> => {
  return await Order.findAll({ where: { comercio_id: comercioId } });
};

export default {
  getAllCommerces,
  getCommerceById,
  getCommerceOrders,
  createCommerce,
  updateCommerce,
  deleteCommerce,
};