import { existsSync, promises } from "fs"
const path = 'Products.json'

class ProductManager {

	async getProducts(queryObj) {
		const { limit } = queryObj
		try {
			if (existsSync(path)) {
				const productFile = await promises.readFile(path, 'utf-8')
				const productData = JSON.parse(productFile)
				return limit ? productData.slice(0, +limit) : productData
			} else {
				return []
			}
		} catch (error) {
			return error
		}
	}

	async addProduct(product) {
		try {
			const { title, description, price, thumbnail, code, stock } = product

			if (!title || !description || !price || !thumbnail || !code || !stock) {
				console.log('Todos los campos son obligatorios')
				return
			}

			const codeExiste = this.products.some(product => product.code === code)
			if (codeExiste) {
				console.log('El código ya está en uso')
				return
			}

			const products = await this.getProducts()
			let id
			!products.length ? id = 1 : id = products[products.length - 1].id + 1
			products.push({ id, ...product })
			await promises.writeFile(path, JSON.stringify(products))
		} catch (error) {
			return error
		}
	}

	async getProductById(id) {
		try {
			const products = await this.getProducts({})
			const product = products.find((product) => product.id === id)
			return product
		} catch (error) {
			return error
		}
	}

	async deleteProduct(id) {
		try {
			const products = await this.getProducts()
			const productsNew = products.filter(product => product.id !== id)
			await promises.writeFile(path, JSON.stringify(productsNew))
		} catch (error) {
			return error
		}
	}

	async updateProduct(id, obj) {
		try {
			const products = await this.getProducts({})
			const index = products.findIndex(product => product.id === id)
			if (index === -1) {
				return null
			}
			const productUpdated = {...products[index], ...obj}
			products.splice(index, 1, productUpdated)
			await promises.writeFile(path, JSON.stringify(products))
			return productUpdated
		} catch (error) {	
			return error
		}
	}
}

// const product1 = {
// 	title: 'Teclado',
// 	description: 'Mecanico',
// 	price: 1000,
// 	thumbnail: '/img/teclado',
// 	code: 123,
// 	stock: 20
// }

// const product2 = {
// 	title: 'Mouse',
// 	description: 'Inalambrico',
// 	price: 500,
// 	thumbnail: '/img/mouse',
// 	code: 124,
// 	stock: 20
// }

// const product3 = {
// 	title: 'Monitor',
// 	description: 'HDMI',
// 	price: 1500,
// 	thumbnail: '/img/monitor',
// 	code: 125,
// 	stock: 5
// }

// async function test() {
// 	const manager1 = new ProductManager()
// 	await manager1.addProduct(product2)
// 	const products = await manager1.getProductById(1)
// 	// 	await manager1.deleteProduct(2)
// 	console.log(products)
// }
// test()

export const manager1 = new ProductManager()