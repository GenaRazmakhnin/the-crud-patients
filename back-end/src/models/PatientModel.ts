import { query } from '../database'
import { paginationGuard, createPatientGuard, updatePatientGuard, recollectPatients, recollectPatient } from './helper'
import { Pagination, ServerException } from '../../../common/types/helper'

const returnFields = [
  'id', 'firstname', 'lastname','middlename', 'gender',
  'number', 'region', 'city', 'street', 'house', 'dob'
].join(', ')

export async function getPatientsList(rawPagination: any) {
  const { search, limit, page }: Pagination = paginationGuard(rawPagination)

  const orderString = ' ORDER BY id DESC'
  const limitString = ` LIMIT ${limit}`
  const searchString = search ? ` lastname LIKE '%' || '${search}' || '%' AND` : ''
  const offsetString = ` OFFSET ${limit*(page - 1)}`

  console.log(`SELECT ${returnFields} FROM patients WHERE${searchString} deleted = false${orderString}${offsetString}${limitString};`)

  const { data: [, data, count] } = await query({
    text: `BEGIN;
           SELECT ${returnFields} FROM patients WHERE${searchString} deleted = false${orderString}${offsetString}${limitString};
           SELECT COUNT(id) AS total FROM patients WHERE deleted = false;
           END;`
  })

  return {
    data: recollectPatients(data.rows),
    pagination: { limit, page, total: Number(count.rows[0].total) || 0 }
  }
}

export async function createPatient(rawPatient: any) {
  const { error: validationErrors, data: guardedAttributes } = createPatientGuard(rawPatient)

  if (guardedAttributes) {
    const fields = Object.keys(guardedAttributes)
    const values = fields.map(field => `'${guardedAttributes[field]}'`)

    const { data: bdResponse} = await query({
      text: `INSERT INTO patients(${fields.join(', ')}) VALUES (${values.join(', ')}) RETURNING ${returnFields}`
    })

    return { data: recollectPatient(bdResponse.rows[0]) }
  }

  return { error: validationErrors }
}

export async function updatePatient(id: number, params: any) {
  const { data } = updatePatientGuard(params)

  // console.log(data)
  const fields = Object.keys(data)
  const mappedFields = fields.map(field => `${field}='${data[field]}'`)

  const { data: bdResponse} = await query({
    text: `UPDATE patients SET ${mappedFields} WHERE id=${Number(id) || null} RETURNING ${returnFields}`
  })
  
  return { data: recollectPatient(bdResponse.rows[0]) }
}

export async function deletePatient(id: number) {
  const { data: bdResponse} = await query({
    text: `UPDATE patients SET deleted = true WHERE id=${Number(id) || null} RETURNING id`
  })

  return { data: bdResponse.rows[0] }
}
