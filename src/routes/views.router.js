import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
    try {
        res.render('chat')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router