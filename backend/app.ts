import express from 'express'
const cors = require('cors')
import foodRouter from './routes/food.route'
const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(express.json())
app.use('/food', foodRouter)
export default app