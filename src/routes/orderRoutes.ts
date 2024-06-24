import { Router } from 'express';
import orderController from '../controllers/orderController';

const router = Router();

router
  .get('/state/:state', orderController.validateOrderState, orderController.getStateOrders)
  .get('/:id', orderController.validateOrderId, orderController.getOrderById)
  .get('/', orderController.getAllOrders)
  .post('/', orderController.validateOrder, orderController.createOrder)
  .patch('/:id/state', orderController.validateOrderStateChange, orderController.changeOrderStatus)
  .put('/:id', orderController.validateOrderUpdate, orderController.updateOrder)
  .delete('/:id', orderController.validateOrderId, orderController.deleteOrder);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - cliente_id
 *         - comercio_id
 *         - repartidor_id
 *         - detalle
 *         - estado
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the order
 *         cliente_id:
 *           type: integer
 *           description: The id of the client
 *         comercio_id:
 *           type: integer
 *           description: The id of the commerce
 *         repartidor_id:
 *           type: integer
 *           description: The id of the delivery man
 *         detalle:
 *           type: string
 *           description: The detail of the order
 *         estado:
 *           type: string
 *           description: The status of the order
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: The creation date of the order
 *         fecha_entrega:
 *           type: string
 *           format: date-time
 *           description: The delivery date of the order
 *       example:
 *         cliente_id: 1
 *         comercio_id: 1
 *         repartidor_id: 1
 *         detalle: "Pedido de prueba"
 *         estado: "preparado"
 *
 *     OrderCreate:
 *       type: object
 *       required:
 *         - cliente_id
 *         - comercio_id
 *         - repartidor_id
 *         - detalle
 *       properties:
 *         cliente_id:
 *           type: integer
 *           description: The id of the client
 *         comercio_id:
 *           type: integer
 *           description: The id of the commerce
 *         repartidor_id:
 *           type: integer
 *           description: The id of the delivery man
 *         detalle:
 *           type: string
 *           description: The detail of the order
 *       example:
 *         cliente_id: 1
 *         comercio_id: 1
 *         repartidor_id: 1
 *         detalle: "Pedido de prueba"
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreate'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Returns the list of all the orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the order
 *     responses:
 *       200:
 *         description: The description of the order by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderCreate'
 *     responses:
 *       200:
 *         description: The order was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete the order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the order
 *     responses:
 *       200:
 *         description: The order was deleted
 *       404:
 *         description: The order was not found
 */

/**
 * @swagger
 * /orders/{id}/status:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderStatusUpdate'
 *     responses:
 *       200:
 *         description: The updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid input or state transition
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /orders/state/{state}:
 *   get:
 *     summary: Get the orders by state
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: state
 *         schema:
 *           type: string
 *         required: true
 *         description: The state of the orders
 *     responses:
 *       200:
 *         description: The list of orders with the given state
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: No orders found with the given state
 */
