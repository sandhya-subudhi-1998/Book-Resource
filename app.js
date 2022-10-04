const { urlencoded } = require('express');
const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const morgan=require('morgan');
const app=express();

const PORT=process.env.PORT || 5000

const url=process.env.MONGODB_URL || 'mongodb+srv://admin:admin@cluster0.kceret3.mongodb.net/?retryWrites=true&w=majority'
// const url='mongodb://localhost:/books'


//Mongoose Connection
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection
con.on('open',()=>{
    console.log("connected")
})
app.use(express.json())
const bookRouter=require('./routes/bookList')
app.use('/bookList',bookRouter);

app.listen(PORT,()=>console.log(`server is up ${PORT}`))