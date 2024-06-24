import Client from '../models/client';
import Order from '../models/order';

interface ClientModel {
  nombre: string;
  direccion: string;
}

const getAllClients = async (): Promise<Client[]> => {
  return await Client.findAll();
};

const getClientById = async (id: number): Promise<Client | null> => {
  return await Client.findByPk(+id);
};

const createClient = async (nombre: string, direccion: string): Promise<Client> => {
  return await Client.create({ nombre, direccion });
};

const updateClient = async (id: number, clienteData: ClientModel): Promise<Client | null> => {
  const client = await Client.findByPk(+id);
  if (!client) throw new Error('Client not found');
  return await client.update(clienteData);
};

const deleteClient = async (id: number): Promise<void> => {
  const client = await Client.findByPk(+id);
  if (!client) throw new Error('Client not found');
  await Order.destroy({ where: { cliente_id: id } });
  await client.destroy();
};

const getClientOrders = async (clientId: number): Promise<Order[]> => {
  return await Order.findAll({ where: { cliente_id: clientId } });
};

export default {
  getAllClients,
  getClientById,
  getClientOrders,
  createClient,
  updateClient,
  deleteClient,
};