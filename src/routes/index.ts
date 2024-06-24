import { Router } from 'express'
import clientRoutes from './clientRoutes'
import deliveryManRoutes from './deliveryManRoutes'
import commerceRoutes from './commerceRoutes'
import orderRoutes from './orderRoutes'

const router = Router()

router.use('/clients', clientRoutes)
router.use('/deliverymen', deliveryManRoutes)
router.use('/commerces', commerceRoutes)
router.use('/orders', orderRoutes)

export default router
