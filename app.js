import express from 'express'
import homeRouter from './routes/memesRouter.js'

const app = express()

app.set('view engine','ejs')
app.use('/',homeRouter)
app.use(express.static('public'));


app.listen(3000,()=>{
    console.log("listening at port 3000 \nhttp://localhost:3000")
})