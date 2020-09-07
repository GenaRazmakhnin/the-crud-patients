export interface Patient {
  id: number,
  firstname: string,
  lastname: string,
  middlename: string,
  number: string,
  address: Address,
  gender: string,
  dob: string,
}

export interface Address {
  region: string,
  city: string,
  street: string, 
  house: string
}