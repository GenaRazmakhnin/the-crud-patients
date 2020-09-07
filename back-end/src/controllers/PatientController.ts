import { Request, Response } from 'express'
import { getPatientsList, createPatient, updatePatient, deletePatient } from '../models/PatientModel'

export async function getPatientsHandler(request: Request, response: Response) {
  const { data, pagination } = await getPatientsList(request.query)

  response.status(200).json({ data, pagination })
}

export async function createPatientHandler(request: Request, response: Response) {
  const { error, data } = await createPatient(request.body)

  if (error) {
    response.status(401).json(error)
    return
  }

  response.status(201).json({ data })
}

export async function updatePatientHandler(request: Request, response: Response) {
  const { data } = await updatePatient(Number(request.params.id) || 0, request.body)

  response.status(200).json({ data })
}

export async function deletePatientHandler(request: Request, response: Response) {
  const { data } = await deletePatient(Number(request.params.id) || 0)

  response.status(200).json({ data })
}