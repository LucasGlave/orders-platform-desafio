import { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import deliveryManService from '../services/deliveryManService';

const getAllDeliveryMen = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const deliveryMen = await deliveryManService.getAllDeliveryMen();
    return res.status(200).send(deliveryMen);
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

const getDeliveryManById = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const deliveryMan = await deliveryManService.getDeliveryManById(+req.params.id);
    if (!deliveryMan) {
      return res.status(404).send({ error: 'DeliveryMan not found' });
    } else {
      return res.status(200).send(deliveryMan);
    }
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const createDeliveryMan = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, activo, transporte } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newDeliveryMan = await deliveryManService.createDeliveryMan({
      nombre,
      activo,
      transporte,
    });
    return res.status(201).send(newDeliveryMan);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const updateDeliveryMan = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, activo, transporte } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedDeliveryMan = await deliveryManService.updateDeliveryMan(+req.params.id, {
      nombre,
      activo,
      transporte,
    });
    if (!updatedDeliveryMan) {
      return res.status(404).send({ error: 'DeliveryMan not found' });
    } else {
      return res.status(200).send(updatedDeliveryMan);
    }
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const deleteDeliveryMan = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const deliveryMan = await deliveryManService.getDeliveryManById(+req.params.id);
    if (!deliveryMan) {
      return res.status(404).send({ error: 'Delivery man not found' });
    }

    await deliveryManService.deleteDeliveryMan(+req.params.id);
    return res.status(200).json(deliveryMan);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const getDeliveryManOrders = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const orders = await deliveryManService.getDeliveryManOrders(+req.params.id);
    return res.status(200).send(orders);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const validateDeliveryManId = [param('id').isInt().withMessage('ID must be an integer')];

const validateDeliveryMan = [
  body('nombre').isString().notEmpty().withMessage('Name is required and must be a string'),
  body('activo').isBoolean().withMessage('Active status is required and must be a boolean'),
  body('transporte')
    .isString()
    .isIn(['Moto', 'Auto', 'Bici'])
    .withMessage('Transport must be one of: Moto, Auto, Bici'),
];

export default {
  getAllDeliveryMen,
  getDeliveryManById,
  createDeliveryMan,
  updateDeliveryMan,
  deleteDeliveryMan,
  getDeliveryManOrders,
  validateDeliveryMan,
  validateDeliveryManId,
};