import { existsSync, promises } from "fs"
const path = 'Cart.json'

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

	async createCart() {
		try {
			const carts = await this.getCarts()
			let id
			!carts.length ? id = 1 : id = carts[carts.length - 1].id + 1
			const cart = { id, products: [] }
			carts.push(cart)
			await promises.writeFile(path, JSON.stringify(carts))
		} catch (error) {
			return error
		}
	}

	async getCartById(id) {
		try {
			const carts = await this.getCarts()
			const cart = carts.find(cart => cart.id === id)
			return cart.products
		} catch (error) {
			return error
		}
	}

	async addProduct(cid, pid) {
		try {
			const carts = await this.getCarts()
			const cart = carts.find(cart => cart.id === cid)
			const productExiste = cart.products.find(product => product.id === pid)
			let quantity
			cart.products.push({
				id: pid,
				quantity: !productExiste ? 1 : quantity + 1
			})
			carts.push(cart)
			await promises.writeFile(path, JSON.stringify(carts))
		} catch (error) {
			return error
		}
	}
}

// async function test() {
// 	const manager1 = new CartManager()
// 	await manager1.createCart()
// 	// const carts = await manager1.addProduct(1, 1)
// 	console.log(carts)
// }
// test()

export const manager1 = new CartManager()