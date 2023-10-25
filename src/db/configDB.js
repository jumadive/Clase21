import mongoose from 'mongoose'

const URI = 
    'mongodb+srv://jumadive1991:xlnVUst8YvoWmQxA@cluster0.nodiakt.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose
    .connect(URI)
    .then(()=>console.log('Conectado a la DB'))
    .catch(error=>console.log(error))