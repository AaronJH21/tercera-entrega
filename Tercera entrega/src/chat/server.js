const express = require('express')
const MessagingResponse = require('twilio').twiml.MessagingResponse

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    return res.json({
        status: 'ok',
        port: PORT
    })
})

const actions ={
    hola: (twiml, name) => twiml.message(`hola ${name}, actualmente podemois ayudarte en:
    1-Comprar un producto
    2-Buscar una sucursal
    3-Hablar con un asesor
    `),
    1(twiml, name)=>twiml.message(`hola ${name},actualmente podemos ayudarte en 
    1-Comprar un Producto
    2-Buscar una sucursal
    3-Hablar con un asesor
    `), 
}

app.post('/whatsapp',(req,res)=>{
    const twiml = new MessagingResponse()
    const name = req.body.ProfileName

    const message = req.body.Body
    
    const action = actions[message] || actions['hola']
    
    twiml.message('Hola,como estas')

    res.set('Content-Type', 'text/xml')
    return res.send(twiml.tostring())
})

app.listen(PORT,()=> console.log(`Servidor escuchando en el puerto ${PORT}`))