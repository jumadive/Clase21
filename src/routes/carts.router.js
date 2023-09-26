import { Router } from 'express'
import { manager1 } from '../CartManager.js'

const router = Router()

router.post('/', async (req, res) => {
    try {
        await manager1.createCart()
        res.status(200).json({ message: 'Cart created', cart: response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router