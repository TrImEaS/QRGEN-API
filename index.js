const express = require ('express')
const path = require ('path')
const bodyParser = require ('body-parser')
const fs = require ('fs')
// const billingDataRouter = require ('./src/Routes/billingData.js')

const PORT = process.env.PORT || 8080

const app = express()
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../admin-qr-request-front/dirt')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
  res.json({ message: `Hi welcome to the API. 
  Routes: 
  /billingData: (/:id || /createDate/byDate/:date || /createDate/byTime/:time || /checkDate/byDate/:date || /checkDate/byTime/:time)` })
})

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'https://www.technologyline.com.ar', 'https://www.line-technology.com.ar']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') 
  res.header('Access-Control-Allow-Credentials', true)
  return next()
})

app.options('/billingData', (req, res) => {
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:8080', 'https://www.technologyline.com.ar', 'https://www.line-technology.com.ar']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', true)  
  } 
  res.send(200)
})

// Endpoint para recibir el archivo HTML y guardarlo en la ruta deseada
app.post('/saveHtml', (req, res) => {
  const htmlContent = req.body.htmlContent // El contenido del archivo HTML recibido desde el cliente
  const fileName = req.body.fileName // Nombre del archivo HTML recibido desde el cliente
  const saveFolderPath = path.join(__dirname, './Files') // Ruta de la carpeta de destino
  console.log(__dirname)
  console.log(htmlContent + fileName)
  // Verificar si la carpeta de destino existe
  if (!fs.existsSync(saveFolderPath)) {
    fs.mkdirSync(saveFolderPath, { recursive: true })
  }

  // Ruta completa del archivo a guardar
  const savePath = path.join(saveFolderPath, fileName)

  // Escribir el archivo HTML en la ruta especificada
  fs.writeFile(savePath, htmlContent, (err) => {
    if (err) {
      console.error('Error al guardar el archivo HTML:', err)
      res.status(500).json({ message: `Error al guardar el archivo HTML ${htmlContent} + ${fileName} + ${__dirname}` })
    } else {
      console.log('Archivo HTML guardado correctamente en:', savePath)
      res.status(200).json({ message: 'Archivo HTML guardado correctamente' })
    }
  })
})
// app.use('/billingData', billingDataRouter)

app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`))


// let isAuthenticated = true
// const loginFilePath = path.join(__dirname, './src/Views/Login/Login.html')

// function authenticate(req, res, next) {
//   if (isAuthenticated) {
//     next()
//   } else {
//     res.status(401).json({ message: 'Access denied. Please login.' })
//   }
// }

// app.use('/login', (req, res) =>{
//   res.sendFile(loginFilePath)
// })


// app.post('/auth', async (req, res) => {
//   const { user, password } = req.body
//   const result = await UserModel.getUser({ user, password })

//   if (result) {
//     res.status(200).json({ success: true })
//   } 
//   else {
//     res.status(404).json({ success: false })
//   }
// })

