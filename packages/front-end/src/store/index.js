import { all, fork } from 'redux-saga/effects'
import { combineReducers } from 'redux'

const modules = require.context('.', true, /^((?!\.unit\.).)*\.ts$/)
const root = {
  reducer: {},
  saga: {}
}

modules.keys().forEach(path => {
  if (/reducer|saga/.test(path) === false) {
    return
  }

  let [name, section] = path
    // Remove the "./" from the beginning
    .replace(/^\.\//, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split nested modules into an array path
    .split(/\//)

  root[section][name] = modules(path).default
})

export const reducer = combineReducers(root.reducer)
export const saga = function* () {
  yield all(Object.keys(root.saga).map(name => fork(root.saga[name])))
}