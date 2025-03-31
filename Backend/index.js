require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001
const db = require('./Database/models')
const jwt = require('jsonwebtoken');

// To be transferred  //
const { User } = require('./Database/models')
const bcrypt = require('bcrypt')
// To be transferred  //

app.use(express.json())
app.use(cookieParser())
// app.use(cors())
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.get('/', (req, res) => {
  res.json({ message: 'Hello My App' })
})

app.post('/create-user', async (req, res) => {
  try {
    const { name, nationalId, workId, email, password, role } = req.body

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      nationalId,
      workId,
      email,
      password: hashedPassword,
      role
    })

    res
      .status(201)
      .json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/check-auth', (req, res) => {
  const token = req.cookies.auth_token
  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    res.status(200).json({ user: decoded })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Invalid token' })
  }
})

const Login = require('./routes/auth/login')
app.use('/api', Login)

db.sequelize.sync().then(() => {
  console.log('*---------*')
  console.log('*---------*')
  console.log('Database is synced')
  app.listen(PORT, () => {
    console.log('PERMIT SERVER ONLINE')
    console.log('*---------*')
    console.log('*---------*')
  })
})
