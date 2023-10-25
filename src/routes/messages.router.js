import { Router } from 'express'
import { messagesManager } from '../managers/messagesManager.js'

const router = Router()

router.post('/', async (req, res) => {
	try {
		const message = await messagesManager.createOne(req.body)
		res.status(200).json({ message: 'Message created', message })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export default router