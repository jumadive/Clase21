import { Router } from 'express'
import { productsManager } from '../managers/productsManager.js'

const router = Router()

// ----------

router.get('/', async (req, res) => {
	try {
		const products = await productsManager.findAll(req.query)
		res.status(200).json({ message: 'Products found', products })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// ----------

router.get('/:pid', async (req, res) => {
	const { pid } = req.params
	try {
		const product = await productsManager.findById(pid)
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}
		res.status(200).json({ message: 'Product found', product })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// ----------

router.post("/", async (req, res) => {
	const { title, description, code, price, stock, category } = req.body

	if (!title || !description || !code || !price || !stock || !category) {
		return res.status(400).json({ message: 'Faltan datos' })
	}

	try {
		const createdProduct = await productsManager.createOne(req.body)
		res.status(200).json({ message: "Product added", product: createdProduct })
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

// ----------

router.delete('/:pid', async (req, res) => {
	const { pid } = req.params
	try {
		const deletedProduct = await productsManager.deleteOne(pid)
		if (!deletedProduct) {
			return res.status(404).json({ message: 'Product not found' })
		}
		res.status(200).json({ message: "Product deleted", product: deletedProduct })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// ----------

router.put('/:pid', async (req, res) => {
	const { pid } = req.params
	try {
		const updatedProduct = await productsManager.updateOne(pid, req.body)
		if (!updatedProduct) {
			return res.status(404).json({ message: 'Product not found' })
		}
		res.status(200).json({ message: 'Product Updated' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

export default router