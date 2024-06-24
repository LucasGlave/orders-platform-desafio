import { Router } from 'express';
import commerceController from '../controllers/commerceController';

const router = Router();

router
  .get('/:id/orders', commerceController.validateCommerceId, commerceController.getCommerceOrders)
  .get('/:id', commerceController.validateCommerceId, commerceController.getCommerceById)
  .get('/', commerceController.getAllCommerces)
  .post('/', commerceController.validateCommerce, commerceController.createCommerce)
  .put(
    '/:id',
    commerceController.validateCommerceId,
    commerceController.validateCommerce,
    commerceController.updateCommerce
  )
  .delete('/:id', commerceController.validateCommerceId, commerceController.deleteCommerce);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Commerce:
 *       type: object
 *       required:
 *         - nombre
 *         - activo
 *         - max_pedidos
 *       properties:
 *         id:
 *           type: integer
 *           description: El id auto-generado del comercio
 *         nombre:
 *           type: string
 *           description: El nombre del comercio
 *         activo:
 *           type: boolean
 *           description: Si el comercio está activo
 *         max_pedidos:
 *           type: integer
 *           description: El máximo de pedidos que el comercio puede recibir
 *       example:
 *         id: 1
 *         nombre: Mi Comercio
 *         activo: true
 *         max_pedidos: 50
 *     CommerceCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - activo
 *         - max_pedidos
 *       properties:
 *         nombre:
 *           type: string
 *           description: El nombre del comercio
 *         activo:
 *           type: boolean
 *           description: Si el comercio está activo
 *         max_pedidos:
 *           type: integer
 *           description: El máximo de pedidos que el comercio puede recibir
 *       example:
 *         nombre: Mi Comercio
 *         activo: true
 *         max_pedidos: 50
 *     CommerceUpdate:
 *       type: object
 *       required:
 *         - nombre
 *         - activo
 *         - max_pedidos
 *       properties:
 *         nombre:
 *           type: string
 *           description: El nombre del comercio
 *         activo:
 *           type: boolean
 *           description: Si el comercio está activo
 *         max_pedidos:
 *           type: integer
 *           description: El máximo de pedidos que el comercio puede recibir
 *       example:
 *         nombre: Mi Comercio
 *         activo: true
 *         max_pedidos: 50
 */

/**
 * @swagger
 * tags:
 *   name: Commerces
 *   description: The commerces managing API
 */

/**
 * @swagger
 * /commerces:
 *   post:
 *     summary: Create a new commerce
 *     tags: [Commerces]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommerceCreate'
 *     responses:
 *       201:
 *         description: The commerce was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commerce'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /commerces:
 *   get:
 *     summary: Returns the list of all the commerces
 *     tags: [Commerces]
 *     responses:
 *       200:
 *         description: The list of the commerces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commerce'
 */

/**
 * @swagger
 * /commerces/{id}:
 *   get:
 *     summary: Get the commerce by id
 *     tags: [Commerces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The commerce id
 *     responses:
 *       200:
 *         description: The commerce description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commerce'
 *       404:
 *         description: The commerce was not found
 */

/**
 * @swagger
 * /commerces/{id}:
 *   put:
 *     summary: Update the commerce by the id
 *     tags: [Commerces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The commerce id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommerceUpdate'
 *     responses:
 *       200:
 *         description: The commerce was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commerce'
 *       404:
 *         description: The commerce was not found
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /commerces/{id}:
 *   delete:
 *     summary: Remove the commerce by id
 *     tags: [Commerces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The commerce id
 *     responses:
 *       204:
 *         description: The commerce was deleted
 *       404:
 *         description: The commerce was not found
 */

/**
 * @swagger
 * /commerces/{id}/orders:
 *   get:
 *     summary: Get the orders of a commerce by the commerce id
 *     tags: [Commerces]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The commerce id
 *     responses:
 *       200:
 *         description: The list of orders for a commerce
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: The commerce was not found
 */
