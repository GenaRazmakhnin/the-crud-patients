import { paginationGuard, createPatientGuard, updatePatientGuard } from "./helper"

const patient = {
  firstname: 'firstname', lastname: 'lastname', gender: 'male',
  middlename: 'middlename', number: '0000000000000000', dob: '5/5/2000',
  address: { region: 'region', city: 'city', street: 'street', house: 'house' }
}

describe('pagination guard cases:', () => {
  const defaultPagination = { search: '', limit: 10, page: 1 }
  
  test("return default if data is empty or broken", () => {
    expect(paginationGuard({})).toEqual(defaultPagination)
    expect(paginationGuard({ limit: 'fizz', page: 'buzz' })).toEqual(defaultPagination)
  })

  test("return required pagination types", () => {
    expect(paginationGuard({ search: 1, limit: '5', page: '2' })).toEqual({ search: '1', limit: 5, page: 2 })
  })

  test("leave only required keys", () => {
    expect(paginationGuard({ ...defaultPagination, fizz: 'buzz' })).toEqual(defaultPagination)
  })
})

describe('patient-create guard cases:', () => {
    test("field is missing", () => {
    const { firstname, ...rest } = patient
    const { error, data } = createPatientGuard(rest)

    expect(data).toBe(undefined)
    expect(error && error.message).toEqual('Мы не можем создать пациента')
    expect(error && error.validation && error.validation.name).toEqual('firstname')
    expect(error && error.validation && error.validation.message).toEqual('Обязательное поле')
  })

  test("address nested field is missing", () => {
    const { address, ...rest } = patient
    const { error, data } = createPatientGuard({ ...rest, address: { ...address, house: '' }})

    expect(data).toBe(undefined)
    expect(error && error.message).toEqual('Мы не можем создать пациента')
    expect(error && error.validation && error.validation.name).toEqual('address')
    expect(error && error.validation && error.validation.message).toEqual('Укажите полный адрес включая дом')
  })

  test("number contains only digits and no longer than 16", () => {
    const { number, ...rest } = patient
    const { error, data } = createPatientGuard({ ...rest, number: 'hello82384293498329048' })

    expect(data).toBe(undefined)
    expect(error && error.message).toEqual('Мы не можем создать пациента')
    expect(error && error.validation && error.validation.name).toEqual('number')
    expect(error && error.validation && error.validation.message).toEqual('Укажите номер из 16 цифр')
  })

  test("leave only reuired keys", () => {
    const { error, data } = createPatientGuard({ ...patient, fuzz: 'bazz' })
    const { address, ...rest } = data

    expect(error).toBe(undefined)
    expect(data).toEqual({ ...rest, ...address })
  })

  test("spread nested address object", () => {
    const { error, data } = createPatientGuard(patient)
    const { address, ...rest } = data

    expect(error).toBe(undefined)
    expect(data).toEqual({ ...address, ...rest })
  })
})

describe('patient-update guard cases:', () => {
  test("leave only reuired keys", () => {
    const { number, lastname } = patient
    const { error, data } = updatePatientGuard({ number, lastname, fuzz: 'bazz' })

    expect(error).toBe(undefined)
    expect(data).toEqual({ number, lastname })
  })
})