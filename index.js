const express = require('express')
const userRoutes = require('./routes/userRoute');
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors({
    origin: 'https://pokemon-ecommerce-ydep.vercel.app/',  // Permite solicitudes desde localhost:3000
    methods: ['GET', 'POST'],         // Permite métodos GET y POST
    allowedHeaders: ['Content-Type'], // Permite cabeceras Content-Type
  }));

app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(port, ()=>{
    console.log(`Server listening on port${port}`)
})