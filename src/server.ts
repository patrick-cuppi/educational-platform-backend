import cors from 'cors'
import dotnev from 'dotenv'
import express from 'express'
import { adminJs, adminJsRouter } from './adminjs'
import { sequelize } from './database'
import { router } from './routes'

dotnev.config()
export const PORT = process.env.PORT || 3030

const app = express()

app.use(cors())

app.use(express.static('public'))

app.use(express.json())

app.use(adminJs.options.rootPath, adminJsRouter)

app.use(router)

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('DB connection successfull!')
  })
  console.log(`Server started successfuly at port ${PORT}!`)
})
