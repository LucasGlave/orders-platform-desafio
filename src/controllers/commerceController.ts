import { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import commerceService from '../services/commerceService';

const getAllCommerces = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const commerces = await commerceService.getAllCommerces();
    return res.status(200).send(commerces);
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

const getCommerceById = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const commerce = await commerceService.getCommerceById(+req.params.id);
    if (!commerce) {
      return res.status(404).send({ error: 'Commerce not found' });
    } else {
      return res.status(200).send(commerce);
    }
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const createCommerce = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, activo, max_pedidos } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const commerce = await commerceService.createCommerce(nombre, activo, max_pedidos);
    return res.status(201).send(commerce);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const updateCommerce = async (req: Request, res: Response): Promise<Response> => {
  const { nombre, activo, max_pedidos } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const commerce = await commerceService.updateCommerce(
      +req.params.id,
      nombre,
      activo,
      max_pedidos
    );
    if (!commerce) {
      return res.status(404).send({ error: 'Commerce not found' });
    } else {
      return res.status(200).send(commerce);
    }
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const deleteCommerce = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const commerce = await commerceService.getCommerceById(+req.params.id);
    if (!commerce) {
      return res.status(404).send({ error: 'Commerce not found' });
    }

    await commerceService.deleteCommerce(+req.params.id);
    return res.status(200).json(commerce);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const getCommerceOrders = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const orders = await commerceService.getCommerceOrders(+req.params.id);
    return res.status(200).send(orders);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const validateCommerce = [
  body('nombre').isString().notEmpty().withMessage('Name is required and must be a string'),
  body('activo').isBoolean().withMessage('Active status is required and must be a boolean'),
  body('max_pedidos').isInt({ gt: 0 }).withMessage('Max orders must be an integer greater than 0'),
];

const validateCommerceId = [param('id').isInt().withMessage('ID must be an integer')];

export default {
  getAllCommerces,
  getCommerceById,
  getCommerceOrders,
  deleteCommerce,
  updateCommerce,
  createCommerce,
  validateCommerce,
  validateCommerceId,
};