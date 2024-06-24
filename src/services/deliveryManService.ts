import DeliveryMan from '../models/deliveryMan';
import Order from '../models/order';

interface DeliveryManModel {
  nombre: string;
  activo: boolean;
  transporte: string;
}

const getAllDeliveryMen = async (): Promise<DeliveryMan[]> => {
  return await DeliveryMan.findAll();
};

const getDeliveryManById = async (id: number): Promise<DeliveryMan | null> => {
  return await DeliveryMan.findByPk(+id);
};

const createDeliveryMan = async ({
  nombre,
  activo,
  transporte,
}: DeliveryManModel): Promise<DeliveryMan> => {
  return await DeliveryMan.create({ nombre, activo, transporte });
};

const updateDeliveryMan = async (
  id: number,
  { nombre, activo, transporte }: DeliveryManModel
): Promise<DeliveryMan | null> => {
  const deliveryMan = await DeliveryMan.findByPk(+id);
  if (!deliveryMan) throw new Error('DeliveryMan not found');
  return await deliveryMan.update({ nombre, activo, transporte });
};

const deleteDeliveryMan = async (id: number): Promise<void> => {
  const deliveryMan = await DeliveryMan.findByPk(+id);
  if (!deliveryMan) throw new Error('DeliveryMan not found');
  await deliveryMan.destroy();
};

const getDeliveryManOrders = async (repartidorId: number): Promise<Order[]> => {
  return await Order.findAll({ where: { repartidor_id: repartidorId } });
};

export default {
  getAllDeliveryMen,
  getDeliveryManById,
  getDeliveryManOrders,
  createDeliveryMan,
  updateDeliveryMan,
  deleteDeliveryMan,
};