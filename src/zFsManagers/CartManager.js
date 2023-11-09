import { existsSync, promises } from "fs"
import { manager1 } from './ProductManager.js'
const path = 'Carts.json'

class CartManager {

	async getCarts() {
		try {
			if (existsSync(path)) {
				const cartFile = await promises.readFile(path, 'utf-8')
				return JSON.parse(cartFile)
			} else {
				return []
			}
		} catch (error) {
			return error
		}
	}

	// ----------

	async createCart() {
		try {
			const carts = await this.getCarts()
			let id
			!carts.length ? id = 1 : id = carts[carts.length - 1].id + 1
			const newCart = { id, products: [] }
			carts.push(newCart)
			await promises.writeFile(path, JSON.stringify(carts))
		} catch (error) {
			return error
		}
	}

	// ----------

	async getCartById(id) {
		try {
			const carts = await this.getCarts()
			const cart = carts.find(cart => cart.id === id)
			return cart
		} catch (error) {
			return error
		}
	}

	// ----------

	async addProductToCart(cid, pid) {
		const carts = await this.getCarts()
		const cartIndex = carts.findIndex(index => index.id === cid)
		if (!carts[cartIndex].products) {
			const newProduct = {product: pid, quantity: 1}
			carts[cartIndex].products.push(newProduct)
		} else {
			carts[cartIndex].products.quantity++
		}
		await promises.writeFile(path, JSON.stringify(carts))
	}
}

export const cartManager = new CartManager()