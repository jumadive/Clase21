import { Router } from 'express'
import { cartsManager } from '../managers/cartsManager.js'

const router = Router()

//CREATE CART
router.post('/', async (req, res) => {
	try {
		const cart = await cartsManager.createCart()
		res.status(200).json({ message: 'Cart created', cart })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

//CART BY ID
router.get('/:cid', async (req, res) => {
	const { cid } = req.params
	try {
		const cart = await cartsManager.findById(cid)
		if (!cart) {
			return res.status(404).json({ message: 'Cart not found' })
		}
		res.status(200).json({ message: 'Cart found', cart })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

//ADD PRODUCT
router.post('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params
	try {
		const response = await cartsManager.addProductToCart(cid, pid)
		res.status(200).json({message: 'Product added', cart: response})
	} catch (error) {
		return res.status(500).json({message: error.message})
	}
})

//DELETE PRODUCT
router.delete('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params
	try {
		const response = await cartsManager.deleteProduct(cid, pid)
		res.status(200).json({message: 'Product deleted', response})
	} catch (error) {
		return res.status(500).json({message: error.message})
	}
})

//UPDATE QUANTITY
router.put('/:cid/products/:pid', async (req, res) => {
	const { cid, pid } = req.params
	const {quantity} = req.body
	try {
		const cart = await cartsManager.updateOne(cid, pid, quantity)
		if (!cart) {
			return res.status(404).json({ message: 'Product not found' })
		}
		res.status(200).json({ message: 'Product Updated' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

//DELETE ALL PRODUCTS
router.delete('/:cid', async (req, res) => {
	const {cid} = req.params
	try {
		const response = await cartsManager.deleteAll(cid)
		res.status(200).json({message: 'Products deleted', response})
	} catch (error) {
		return res.status(500).json({message: error.message})
	}
})

export default router