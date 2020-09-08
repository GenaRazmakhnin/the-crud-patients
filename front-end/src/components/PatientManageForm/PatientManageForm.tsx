import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'

import { sagaGetAddressesList } from '../../store/address/actions'
import { sagaCreateUser, sagaUpdateUser } from '../../store/user/actions'

import { Patient, Address } from '../../../../common/types/entities'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import style from './patient-manage-form.module.scss'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import BaseAutocomplite from '../base/base-autocomplite'
import debounce from 'lodash/debounce'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../types/store'
import { addressFormat } from './helper'

interface Props {
  patient?: Patient,
  onClose: (succeed: boolean) => void
}

interface FormErrors {
  firstname?: string,
  lastname?: string,
  middlename?: string,
  number?: string,
  address?: string,
}

interface FormFields {
  firstname: string,
  middlename: string,
  lastname: string,
  number: string,
  gender: string,
  dob: string, 
  address: Address | null
}

const validate = (values: FormFields) => {
  const errors: FormErrors = {}

  if (values.firstname === '') {
    errors.firstname = 'Обязательное поле'
  }
  
  if (values.lastname === '') {
    errors.lastname = 'Обязательное поле'
  }

  if (values.middlename === '') {
    errors.middlename = 'Обязательное поле'
  }

  if (values.number === '') {
    errors.number = 'Обязательное поле'
  } else if (values.number && values.number.length < 16) {
    errors.number = 'Укажите номер из 16 цифр'
  }

  if (!values.address) {
    errors.address = 'Обязательное поле'
  } else if (
    (['region', 'city', 'street', 'house'] as Array<keyof Address>)
      .every(field => Boolean(values.address && values.address[field]) === false)
  ) {
    errors.address = 'Укажите полный адрес включая дом'
  }

  return errors
}

const getDefaultFields = (patient: Patient | undefined) => {
  const defaultFields: FormFields = {
    gender: 'male', firstname: '', address: null,
    middlename: '', lastname: '', number: '', 
    dob: '01/01/1995'
  }

  if (patient) {
    const { id, ...rest } = patient
    return { id, defaultFields: rest }
  }

  return { id: null, defaultFields: defaultFields }
}

const RegistrationForm: React.FC<Props> = ({ patient, onClose }) => {
  const dispatch = useDispatch()
  const [loading, changeLoadingStatus] = useState(false)
  const { id, defaultFields } = getDefaultFields(patient)

  const formik = useFormik({
    initialValues: defaultFields,
    validate,
    onSubmit: async form => {
      changeLoadingStatus(true)
 
      await new Promise((resolve, reject) => {
        id
          ? dispatch(sagaUpdateUser(id, form, { resolve, reject }))
          : dispatch(sagaCreateUser(form, { resolve, reject }))
      })

      changeLoadingStatus(false)
      onClose(true)
    }
  })

  const {
    errors, values, touched,
    submitForm, setFieldValue, handleChange, handleBlur
  } = formik

  const addresses = useSelector(
    (store: RootState) => store.address.list,
    shallowEqual
  )

  const onAddressQueryChange = debounce(function (query: string) {
    dispatch(sagaGetAddressesList(query))
  }, 250)

  const onAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFieldValue('address', event, true)
  }

  const onNumberChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const string = event.target.value
    setFieldValue('number', string.replace(/\D+/g, '').slice(0, 16), true)
  }

  const onDateChange = (event: MaterialUiPickersDate) => {
    setFieldValue('dob', event ? event.toLocaleDateString() : null, false)
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    submitForm()
  }

  const getError = (key: keyof FormFields) => {
    return touched[key] && errors[key] || ''
  }

  return (
    <form className={style['container']} onSubmit={onSubmitHandler}>
      <Paper>
        <div className={style['form-group']}>
          <TextField
            label="Фамилия *"
            type="text"
            name="lastname"
            placeholder="Иванов"
            value={values['lastname']}
            error={Boolean(getError('lastname'))}
            helperText={String(getError('lastname'))}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            label="Имя *"
            type="text"
            name="firstname"
            placeholder="Иван"
            value={values['firstname']}
            error={Boolean(getError('firstname'))}
            helperText={String(getError('firstname'))}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={style['form-group']}>
          <TextField
            label="Отчество *"
            type="text"
            name="middlename"
            placeholder="Иванович"
            value={values['middlename']}
            error={Boolean(getError('middlename'))}
            helperText={String(getError('middlename'))}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextField
            label="Номер полиса ОМС *"
            type="text"
            name="number"
            placeholder="0000 0000 0000 0000"
            value={(values.number.match(/.{1,4}/g) || []).join(' ')}
            error={Boolean(getError('number'))}
            helperText={String(getError('number'))}
            onChange={onNumberChange}
            onBlur={handleBlur}
          />
        </div>

        <BaseAutocomplite
          label="Адрес *"
          value={values.address}
          suggestions={addresses.data}
          onInput={onAddressQueryChange}
          onChange={onAddressChange}
          itemFormat={addressFormat}
          error={Boolean(getError('address'))}
          helperText={String(getError('address'))}
        />

        <div className={style['form-group']}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              label="Дата рождения *"
              format="MM/dd/yyyy"
              value={values.dob}
              onChange={onDateChange}
            />
          </MuiPickersUtilsProvider>
        </div>

        <RadioGroup name="gender" value={values.gender} onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Жен." />
          <FormControlLabel value="male" control={<Radio />} label="Муж." />
        </RadioGroup>

        <div className={style['bottom-buttons']}>
          <Button type="button" variant="contained" onClick={() => onClose(false)}>
            Отменить
          </Button>

          <Button variant="contained" type="submit" color="primary">
            {loading ? 'Сохранение' : 'Сохранить'}
          </Button>
        </div>
      </Paper>
    </form>
  )
}

export default RegistrationForm
