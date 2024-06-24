import { Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import orderService from '../services/orderService';

const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const orders = await orderService.getAllOrders(page, limit);
    return res.status(200).send(orders);
  } catch (error: any) {
    return res.status(500).send({ error: error.message });
  }
};

const getOrderById = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const order = await orderService.getOrderById(+req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    } else {
      return res.status(200).send(order);
    }
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const createOrder = async (req: Request, res: Response): Promise<Response> => {
  const { detalle, cliente_id, comercio_id, repartidor_id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newOrder = await orderService.createOrder({
      detalle,
      cliente_id,
      comercio_id,
      repartidor_id,
    });
    return res.status(201).send(newOrder);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedOrder = await orderService.updateOrder(+req.params.id, req.body);
    if (!updatedOrder) {
      return res.status(404).send({ error: 'Order not found' });
    } else {
      return res.status(200).send(updatedOrder);
    }
  } catch (error: any) {
    if (error.message === 'Cannot update order in current state') {
      return res.status(400).send({ error: 'Cannot update order in current state' });
    }
    return res.status(400).send({ error: error.message });
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const order = await orderService.getOrderById(+req.params.id);
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    await orderService.deleteOrder(+req.params.id);
    return res.status(200).json(order);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const changeOrderStatus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { change } = req.body;
  if (change === null || change === undefined) {
    return res.status(400).json({ message: 'The change instruction is required' });
  }
  try {
    const transitionOrder = await orderService.changeOrderStatus(+id, change);
    return res.status(200).json(transitionOrder);
  } catch (error: any) {
    console.error(error);
    if (error.message === 'Order is completed') {
      return res
        .status(400)
        .json({ message: 'Cannot change status of a completed or cancelled order' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
};

const getStateOrders = async (req: Request, res: Response): Promise<Response> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const orders = await orderService.getStateOrders(req.params.state, page, limit);
    return res.status(200).send(orders);
  } catch (error: any) {
    return res.status(400).send({ error: error.message });
  }
};

const validateOrder = [
  body('detalle').isString().notEmpty().withMessage('Detail is required and must be a string'),
  body('cliente_id').isInt().withMessage('Client ID must be an integer'),
  body('comercio_id').isInt().withMessage('Commerce ID must be an integer'),
  body('repartidor_id').isInt().withMessage('Delivery man ID must be an integer'),
];

const validateOrderUpdate = [
  param('id').isInt().withMessage('Order ID must be an integer'),
  body('cliente_id').optional().isInt().withMessage('Client ID must be an integer'),
  body('comercio_id').optional().isInt().withMessage('Commerce ID must be an integer'),
  body('repartidor_id').optional().isInt().withMessage('Delivery man ID must be an integer'),
  body('detalle')
    .optional()
    .isString()
    .notEmpty()
    .withMessage('Detail is required and must be a string'),
  body('estado')
    .optional()
    .isString()
    .isIn(['preparado', 'en_curso', 'entregado', 'cancelado'])
    .withMessage('State must be one of: preparado, en_curso, entregado, cancelado'),
];

const validateOrderId = [param('id').isInt().withMessage('Order ID must be an integer')];

const validateOrderState = [
  param('state')
    .isString()
    .isIn(['preparado', 'en_curso', 'entregado', 'cancelado'])
    .withMessage('State must be one of: preparado, en_curso, entregado, cancelado'),
];

const validateOrderStateChange = [
  param('id').isInt().withMessage('Order ID must be an integer'),
  body('change').notEmpty().withMessage('The change instruction is required'),
];

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
  getStateOrders,
  validateOrder,
  validateOrderUpdate,
  validateOrderId,
  validateOrderState,
  validateOrderStateChange,
};