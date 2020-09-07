import express from 'express'
import routes from './router'
import middlewares from './middleware'
import database from './database'
const path = require('path')

const PORT = process.env.PORT || 5000

async function startServer () {
  const app = express()
  
  middlewares(app)
  database(app)
  routes(app)

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })

  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/front-end/build/index.html'));
  })
}

startServer()
