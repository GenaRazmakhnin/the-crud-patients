import express, { Application } from 'express'
import * as parser from 'body-parser'

export default (app: Application) => {
  app.use(parser.json())
  app.use(express.static(__dirname + '/dist'))
  app.use(parser.urlencoded({ extended: true }))
  app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH")
    res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization, X-Requested-With")

    next()
  })

  return app
}