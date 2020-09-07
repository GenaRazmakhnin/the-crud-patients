import { Pagination, ServerException } from '../../../common/types/helper'
import { Patient } from '../../../common/types/entities'

interface Exception {
  data?: undefined,
  error: ServerException
}

interface Data {
  data: any,
  error?: undefined
}

const patientFields = ['firstname', 'lastname', 'middlename', 'number', 'address', 'gender', 'dob']
const addressFields = ['region', 'city', 'street', 'house']

export function paginationGuard(pagination: any): Pagination {
  const { limit, page, search } = pagination
  const guardedLimit = Number(limit) || 20
  const guardedPage = Number(page) || 1
  const guardedSearch = search ? String(search) : ''

  return {
    search: guardedSearch,
    limit: guardedLimit > 20 ? 20 : guardedLimit,
    page: guardedPage
  }
}

export function createPatientGuard(patient: any): Data | Exception {
  const fieldMissing = checkFields(patient, patientFields)

  if (fieldMissing) {
    return { error: {
      message: 'Мы не можем создать пациента',
      validation: { name: fieldMissing, message: 'Обязательное поле' }
    }}
  }

  if (checkFields(patient.address, addressFields)) {
    return { error: {
      message: 'Мы не можем создать пациента',
      validation: { name: 'address', message: 'Укажите полный адрес включая дом' }
    }}
  }

  patient.number = patient.number.replace(/\D+/g, '')

  if (patient.number.length < 16) {
    return { error: {
      message: 'Мы не можем создать пациента',
      validation: { name: 'number', message: 'Укажите номер из 16 цифр' }
    }}
  }

  const recollectedForm = patientFields.reduce((data, field) => {
    if (field === 'address') {
      return { ...data, ...patient[field] }
    }

    return { ...data, [field]: patient[field] }
  }, {})

  return { data: recollectedForm }
}

export function updatePatientGuard(patient: any): Data | Exception {
  const incomingFields = Object.keys(patient)

  const recollectedForm = incomingFields.reduce((data, field) => {
    if (patientFields.includes(field)) {
      if (field === 'address') {
        return { ...data, ...patient[field] }
      }

      if (field === 'number') {
        patient[field] = patient[field].replace(/\D+/g, '')
      }

      return { ...data, [field]: patient[field] }
    }
  }, {})

  return { data: recollectedForm }
}

export function recollectPatients(data: any): Array<Patient> {
  return data.map(recollectPatient)
}

export function recollectPatient({region, city, street, house, ...rest}: any): Patient {
  return { ...rest, address: { region, city, street, house }}
}

function checkFields (model: object, fields: Array<string>): string | undefined {
  return fields.find(field => !model[field])
}
