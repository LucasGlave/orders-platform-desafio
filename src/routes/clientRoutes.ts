import { Router } from 'express';
import clientController from '../controllers/clientController';

const router = Router();

router
  .get('/:id/orders', clientController.validateClientId, clientController.getClientOrders)
  .get('/:id', clientController.validateClientId, clientController.getClientById)
  .get('/', clientController.getAllClients)
  .post('/', clientController.validateClient, clientController.createClient)
  .put(
    '/:id',
    clientController.validateClientId,
    clientController.validateClient,
    clientController.updateClient
  )
  .delete('/:id', clientController.validateClientId, clientController.deleteClient);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       required:
 *         - nombre
 *         - direccion
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the client
 *         nombre:
 *           type: string
 *           description: The client's name
 *         direccion:
 *           type: string
 *           description: The client's address
 *       example:
 *         id: 1
 *         nombre: "Juan Pérez"
 *         direccion: "Calle Falsa 123"
 *     ClientCreate:
 *       type: object
 *       required:
 *         - nombre
 *         - direccion
 *       properties:
 *         nombre:
 *           type: string
 *           description: The client's name
 *         direccion:
 *           type: string
 *           description: The client's address
 *       example:
 *         nombre: "Juan Pérez"
 *         direccion: "Calle Falsa 123"
 *     ClientUpdate:
 *       type: object
 *       required:
 *         - nombre
 *         - direccion
 *       properties:
 *         nombre:
 *           type: string
 *           description: The client's name
 *         direccion:
 *           type: string
 *           description: The client's address
 *       example:
 *         nombre: "Juan Pérez"
 *         direccion: "Calle Falsa 123"
 */

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API for managing clients
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientCreate'
 *     responses:
 *       201:
 *         description: The client was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Returns the list of all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: The list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The client id
 *     responses:
 *       200:
 *         description: The client description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: The client was not found
 */

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The client id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientUpdate'
 *     responses:
 *       200:
 *         description: The client was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: The client was not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Remove the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The client id
 *     responses:
 *       200:
 *         description: The client was deleted
 *       404:
 *         description: The client was not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /clients/{id}/orders:
 *   get:
 *     summary: Get the orders of a client by client id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The client id
 *     responses:
 *       200:
 *         description: The client's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: The client was not found
 */
