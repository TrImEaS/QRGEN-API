const express = require ('express')
const cors = require ('cors')
const path = require ('path')
const bodyParser = require ('body-parser')
const billingDataRouter = require ('./src/Routes/billingData.js')
// const UserModel = require ('./src/Models/users.js')

const PORT = process.env.PORT || 8080

let isAuthenticated = true
const loginFilePath = path.join(__dirname, './src/Views/Login/Login.html')

function authenticate(req, res, next) {
  if (isAuthenticated) {
    next()
  } else {
    res.status(401).json({ message: 'Access denied. Please login.' })
  }
}

const app = express()
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../admin-qr-request-front/dirt')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
  res.json({ message: `Hi welcome to the API. 
  Routes: 
  /billingData: (/:id || /createDate/byDate/:date || /createDate/byTime/:time || /checkDate/byDate/:date || /checkDate/byTime/:time)` })
})

app.use('/login', (req, res) =>{
  res.sendFile(loginFilePath)
})


// app.post('/auth', async (req, res) => {
//   const { user, password } = req.body;
//   const result = await UserModel.getUser({ user, password })

//   if (result) {
//     res.status(200).json({ success: true })
//   } 
//   else {
//     res.status(404).json({ success: false })
//   }
// })

app.use('/billingData', billingDataRouter)

app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`))