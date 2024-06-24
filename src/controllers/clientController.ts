import { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import clientService from '../services/clientService';

const getAllClients = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const clients = await clientService.getAllClients();
    return res.status(200).send(clients);
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

const getClientById = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const client = await clientService.getClientById(+req.params.id);
    if (!client) {
      return res.status(404).send({ error: 'Client not found' });
    }
    return res.status(200).send(client);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const createClient = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, direccion } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const client = await clientService.createClient(nombre, direccion);
    return res.status(201).send(client);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const updateClient = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, direccion } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const client = await clientService.updateClient(+req.params.id, { nombre, direccion });
    if (!client) {
      return res.status(404).send({ error: 'Client not found' });
    }
    return res.status(200).send(client);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const deleteClient = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const client = await clientService.getClientById(+req.params.id);
    if (!client) {
      return res.status(404).send({ error: 'Client not found' });
    }
    await clientService.deleteClient(+req.params.id);
    return res.status(200).json(client);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const getClientOrders = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const orders = await clientService.getClientOrders(+req.params.id);
    return res.status(200).send(orders);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const validateClient = [
  body('nombre').isString().notEmpty().withMessage('Name is required and must be a string'),
  body('direccion').isString().notEmpty().withMessage('Address is required and must be a string'),
];

const validateClientId = [param('id').isInt().withMessage('ID must be an integer')];

export default {
  getAllClients,
  getClientById,
  getClientOrders,
  deleteClient,
  updateClient,
  createClient,
  validateClient,
  validateClientId,
};