import { Router } from 'express';
import deliveryManController from '../controllers/deliveryManController';

const router = Router();

router
  .get(
    '/:id/orders',
    deliveryManController.validateDeliveryManId,
    deliveryManController.getDeliveryManOrders
  )
  .get(
    '/:id',
    deliveryManController.validateDeliveryManId,
    deliveryManController.getDeliveryManById
  )
  .get('/', deliveryManController.getAllDeliveryMen)
  .post('/', deliveryManController.validateDeliveryMan, deliveryManController.createDeliveryMan)
  .put(
    '/:id',
    deliveryManController.validateDeliveryManId,
    deliveryManController.validateDeliveryMan,
    deliveryManController.updateDeliveryMan
  )
  .delete(
    '/:id',
    deliveryManController.validateDeliveryManId,
    deliveryManController.deleteDeliveryMan
  );

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryMan:
 *       type: object
 *       required:
 *         - nombre
 *         - activo
 *         - transporte
 *       properties:
 *         id:
 *           type: integer
 *           description: El id auto-generado del repartidor
 *         nombre:
 *           type: string
 *           description: El nombre del repartidor
 *         activo:
 *           type: boolean
 *           description: Si el repartidor está activo
 *         transporte:
 *           type: string
 *           enum: [bici, moto, auto]
 *           description: El tipo de transporte del repartidor
 *       example:
 *         id: 1
 *         nombre: Juan Perez
 *         activo: true
 *         transporte: moto
 *     DeliveryManCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - activo
 *         - transporte
 *       properties:
 *         nombre:
 *           type: string
 *           description: El nombre del repartidor
 *         activo:
 *           type: boolean
 *           description: Si el repartidor está activo
 *         transporte:
 *           type: string
 *           enum: [bici, moto, auto]
 *           description: El tipo de transporte del repartidor
 *       example:
 *         nombre: Juan Perez
 *         activo: true
 *         transporte: moto
 *     DeliveryManUpdate:
 *       type: object
 *       required:
 *         - nombre
 *         - activo
 *         - transporte
 *       properties:
 *         nombre:
 *           type: string
 *           description: El nombre del repartidor
 *         activo:
 *           type: boolean
 *           description: Si el repartidor está activo
 *         transporte:
 *           type: string
 *           enum: [bici, moto, auto]
 *           description: El tipo de transporte del repartidor
 *       example:
 *         nombre: Juan Perez
 *         activo: true
 *         transporte: moto
 */

/**
 * @swagger
 * tags:
 *   name: DeliveryMen
 *   description: The delivery men managing API
 */

/**
 * @swagger
 * /deliverymen:
 *   post:
 *     summary: Create a new delivery man
 *     tags: [DeliveryMen]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryManCreate'
 *     responses:
 *       201:
 *         description: The delivery man was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryMan'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /deliverymen:
 *   get:
 *     summary: Returns the list of all the delivery men
 *     tags: [DeliveryMen]
 *     responses:
 *       200:
 *         description: The list of the delivery men
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeliveryMan'
 */

/**
 * @swagger
 * /deliverymen/{id}:
 *   get:
 *     summary: Get the delivery man by id
 *     tags: [DeliveryMen]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The delivery man id
 *     responses:
 *       200:
 *         description: The delivery man description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryMan'
 *       404:
 *         description: The delivery man was not found
 */

/**
 * @swagger
 * /deliverymen/{id}:
 *   put:
 *     summary: Update the delivery man by the id
 *     tags: [DeliveryMen]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The delivery man id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryManUpdate'
 *     responses:
 *       200:
 *         description: The delivery man was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryMan'
 *       404:
 *         description: The delivery man was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /deliverymen/{id}:
 *   delete:
 *     summary: Remove the delivery man by id
 *     tags: [DeliveryMen]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The delivery man id
 *     responses:
 *       200:
 *         description: The delivery man was deleted
 *       404:
 *         description: The delivery man was not found
 */

/**
 * @swagger
 * /deliverymen/{id}/orders:
 *   get:
 *     summary: Get the orders of a delivery man by the delivery man id
 *     tags: [DeliveryMen]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The delivery man id
 *     responses:
 *       200:
 *         description: The list of orders for a delivery man
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: The delivery man was not found
 */
