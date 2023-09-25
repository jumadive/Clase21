import express from 'express'
import { manager1 } from './ProductManager.js'

const app = express()

app.use(express.json())

app.get('/products', async (req, res) => {
	try {
		const products = await manager1.getProducts(req.query)
		res.status(200).json({ message: 'Products found', products })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

app.get('/products/:pid', async (req, res) => {
	const { pid } = req.params
	try {
		const product = await manager1.getProductById(+pid)
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}
		res.status(200).json({ message: 'Product found', product })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

// app.put('/products/:pid', async (req, res) => {
// 	const { pid } = req.params
// 	try {
// 		const response = await manager1.updateProduct(+pid, req.body)
// 		if (!response) {
// 			return res.status(404).json({ message: 'User not found' })
// 		}
// 		res.status(200).json({ message: 'User Updated' })
// 	} catch (error) {
// 		res.status(500).json({ message: error.message })
// 	}
// })

app.listen(8080, () => {
	console.log("Escuchando Puerto 8080")
})