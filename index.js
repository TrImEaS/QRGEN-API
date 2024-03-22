import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { billingDataRouter } from './src/Routes/billingData.js'
import { UserModel } from './src/Models/users.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PORT = process.env.PORT ?? 8080

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
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../admin-qr-request-front/dirt')))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) =>{
  res.json({ message: `Hi welcome to the API. 
  Routes: 
  /billingData: (/:id || /createDate/byDate/:date || /createDate/byTime/:time || /checkDate/byDate/:date || /checkDate/byTime/:time)` })
})

app.use('/login', (req, res) =>{
  res.sendFile(loginFilePath)
})


app.post('/auth', async (req, res) => {
  const { user, password } = req.body;
  const result = await UserModel.getUser({ user, password })

  if (result) {
    res.status(200).json({ success: true })
  } 
  else {
    res.status(404).json({ success: false })
  }
})

app.use('/billingData', authenticate, billingDataRouter)

app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}`))


  // if (result) {
  //   const newUser = { username: user };
  //   const accessToken = generateAccessToken(newUser);

  //   res.header('Authorization', accessToken).json({
  //     message: 'Usuario autenticado',
  //     token: accessToken
  //   });
  // } else {
  //   res.status(404).json({ message: 'User not found' });
  // }