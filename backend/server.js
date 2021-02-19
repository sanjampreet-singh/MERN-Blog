const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()


const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

if(process.env.NODE_ENV === 'development') app.use(cors({origin:process.env.CLIENT_URL}))


mongoose.connect('mongodb://localhost:27017/temp_db', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true})
.then( ()=> console.log('DB Connected'))


app.use('/api',blogRoutes)
app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',tagRoutes)


const port = process.env.PORT || 8000 

app.listen( port , () => console.log(`Server listening at ${port}`))