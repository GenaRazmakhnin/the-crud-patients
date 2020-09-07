import path from 'path'
import { Application } from 'express'
import {
  getPatientsHandler,
  createPatientHandler,
  updatePatientHandler,
  deletePatientHandler
} from './controllers/PatientController'

export default (app: Application) => {

  app.get(`/api/patients`, getPatientsHandler)
  app.post(`/api/patients`, createPatientHandler)
  app.patch(`/api/patients/:id`, updatePatientHandler)
  app.delete(`/api/patients/:id`, deletePatientHandler)

}