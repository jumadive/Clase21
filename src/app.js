import express from 'express'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { __dirname } from './utils.js'
import { Server } from "socket.io";
import viewsRouter from './routes/views.router.js'
import messagesRouter from './routes/messages.router.js'
import sessionsRouter from "./routes/sessions.router.js"
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieRouter from "./routes/cookie.router.js"
import './db/configDB.js'
import passport from 'passport'
import './passport.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser("SecretCookie"))
//mongoLogin
const URI = 
    'mongodb+srv://jumadive1991:xlnVUst8YvoWmQxA@cluster0.nodiakt.mongodb.net/ecommerce?retryWrites=true&w=majority'
app.use(
	session({
	  store: new MongoStore({
		mongoUrl: URI,
	  }),
	  secret: "secretSession",
	  cookie: { maxAge: 60000 },
	})
  )

// handlebars
app.engine('handlebars', handlebars.engine({
	defaultLayout: 'main',
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true
	}
}))
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


// routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)
app.use('/', viewsRouter)
app.use('/api/cookie', cookieRouter);
app.use('/api/sessions', sessionsRouter)
//passport
app.use(passport.initialize())
app.use(passport.session())


const PORT = 8080

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})

const socketServer = new Server(httpServer)
const messages = []
socketServer.on("connection", (socket) => {
//   console.log(`Cliente conectado: ${socket.id}`)
  socket.on("newUser", (user) => {
    socket.broadcast.emit("userConnected", user)
    socket.emit("connected")
  })
  socket.on("message", (infoMessage) => {
    messages.push(infoMessage)
    socketServer.emit("chat", messages)
  })
})

