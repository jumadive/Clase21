import { cartsModel } from '../db/models/carts.model.js'

class CartsManager {
    //CREATE CART
    async createCart() {
        const newCart = {products: []}
        const result = await cartsModel.create(newCart)
        return result
    }
    //CART BY ID
    async findById(id) {
        const result = await cartsModel.findById(id).populate('products.product', ['title'])
        return result
    }
    //ADD PRODUCT TO CART
    async addProductToCart(cid, pid) {
        const cart = await cartsModel.findById(cid)
        const productIndex = cart.products.findIndex(p => p.product.equals(pid))
        if (productIndex === -1) {
            cart.products.push({product: pid, quantity: 1})
        } else {
            cart.products[productIndex].quantity++
        }
        return cart.save()
    }
    //DELETE PRODUCT
    async deleteProduct(cid, pid) {
        const cart = await cartsModel.findById(cid)
        const productIndex = cart.products.findIndex(p => p.product.equals(pid))
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1)
        } else {
            throw new Error('Producto no existente')
        }
        return cart.save()
    }

    //UPDATE QUANTITY
    async updateOne(cid, pid, newQuantity) {
        const cart = await cartsModel.findById(cid)
        const productIndex = cart.products.findIndex(p => p.product.equals(pid))
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = newQuantity
        } else {
            throw new Error('Producto no existente')
        }
        return cart.save()
    }

     //DELETE ALL PRODUCTS
     async deleteAll(cid) {
        const cart = await cartsModel.findById(cid)
        if (cart) {
            cart.products = []
        } else {
            throw new Error('Cart no existente')
        }
        return cart.save()
    }
}



export const cartsManager = new CartsManager()