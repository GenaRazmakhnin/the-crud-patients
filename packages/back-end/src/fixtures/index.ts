const middlenames = require('./middle_name.json')
const firstnames = require('./first_name.json')
const lastnames = require('./last_name.json')

export default function getParientStub() {
  const randomMName = middlenames[Math.floor(Math.random() * middlenames.length)]
  const randomFName = firstnames[Math.floor(Math.random() * firstnames.length)]
  const randomLName = lastnames[Math.floor(Math.random() * lastnames.length)]
  
  return {
    middlename: randomMName.name,
    firstname: randomFName.name,
    lastname: randomLName.name,
  }
}