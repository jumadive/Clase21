import { Router } from 'express'
import { productsManager } from '../managers/productsManager.js'
import { cartsManager } from '../managers/cartsManager.js'

const router = Router()

router.get('/chat', async (req, res) => {
    try {
        res.render('chat')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/products', async (req, res) => {
    if (!req.session.user) {
    return res.redirect("/login")
    }
    try {
        const products = await productsManager.findAll(req.query)
        
        res.render('products', {response: products.results, user: req.session.user})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/cart/:cid', async (req, res) => {
    const {cid} = req.params 
    try {
        const cart = await cartsManager.findById(cid)
        res.render('cart', {response: cart})
        console.log(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/login", (req, res) => {
    if (req.session.user) {
      return res.redirect("/profile");
    }
    res.render("login");
  })
  
  router.get("/signup", (req, res) => {
    if (req.session.user) {
      return res.redirect("/profile");
    }
    res.render("signup");
  })
  
  router.get("/products", (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    console.log(req.session.user);
    res.render("products", { user: req.session.user });
  })
  
export default router