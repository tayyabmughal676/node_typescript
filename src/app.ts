import express, {Request, Response, NextFunction, Application, ErrorRequestHandler} from 'express'
import {Server} from 'http'
import createHttpError from 'http-errors'
import {config} from 'dotenv'
config()

console.log(123456)

const app: Application = express()

app.get('/', (req: Request, res: Response, next: NextFunction)=> {
    res.send("Hello, TypeScript!")
})

app.use((req: Request, res: Response, next: NextFunction)=>{
    next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    }) 
}

const PORT: Number = Number(process.env.PORT) || 3000

const server: Server = app.listen(PORT, ()=> console.log(`TypeScript running at ${PORT}`)) 