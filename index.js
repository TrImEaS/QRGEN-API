const express = require ('express')
const cors = require('cors')
const path = require ('path')
const billingDataRouter = require ('./src/Routes/billingData.js')
const usersRouter = require ('./src/Routes/users.js')
const employeeRouter = require ('./src/Routes/employees.js')
const conceptRouter = require ('./src/Routes/concepts.js')

const PORT = process.env.PORT || 8080
const app = express()
const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'https://www.technologyline.com.ar', 'https://technologyline.com.ar', 'https://line-technology.com.ar']

app.disable('x-powered-by')
app.use(express.json())
app.use(express.static(path.join(__dirname, '../admin-qr-request-front/dirt')))
app.use(cors({
  origin: allowedOrigins
}));  

//Simple ruta principal
app.get('/', (req, res) =>{
  res.json({ message: `Hi welcome to the API.
  Routes: /billingData: (/:id || /createDate/byDate/:date || /createDate/byTime/:time || /checkDate/byDate/:date || /checkDate/byTime/:time)` })
})

//Rutas
app.use('/billingData', billingDataRouter)
app.use('/users', usersRouter)
app.use('/concepts', conceptRouter)
app.use('/employees', employeeRouter)

//Inicio del servidor
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`))


// --> Solucion cors y preflight para <--//
// app.use((req, res, next) => {
//   const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'https://www.technologyline.com.ar', 'https://www.line-technology.com.ar', 'http://www.line-technology.com.ar']
//   const origin = req.headers.origin
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin)
//   }
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') 
//   res.header('Access-Control-Allow-Credentials', true)
//   return next()
// })

// app.options('/billingData', (req, res) => {
//   const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'https://www.technologyline.com.ar', 'https://www.line-technology.com.ar','http://www.line-technology.com.ar']
//   const origin = req.headers.origin
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader('Access-Control-Allow-Origin', origin)
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     res.header('Access-Control-Allow-Credentials', true)  
//   } 
//   res.send(200)
// })