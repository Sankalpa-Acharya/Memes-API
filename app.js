import express from 'express';
import cors from 'cors'; 
import homeRouter from './routes/memesRouter.js';

const app = express()
const port = process.env.PORT || 3000
app.set('view engine','ejs')
app.use(cors())
app.use('/',homeRouter)
app.use(express.static('public'));


app.listen(port,()=>{
    console.log("listening at port 3000 \nhttp://localhost:3000")
})