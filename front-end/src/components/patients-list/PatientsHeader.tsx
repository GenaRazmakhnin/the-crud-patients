import React, { useState, useCallback, memo } from 'react'
import { Toolbar } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import debounce from 'lodash/debounce'

import styles from './patients-list.module.scss'

interface Props {
  query: string,
  onCreatePatient: () => void,
  onSearchQueryUpdate: (query: string) => void
}

const debounceFunction = debounce((fn, value) => fn(value), 250)

const PatientsHeader: React.FC<Props> = ({ query, onCreatePatient, onSearchQueryUpdate }) => {
  const [localQueryString, setQuery] = useState(query)

  const onAddressQueryChange = useCallback((value: string) => {
    debounceFunction(onSearchQueryUpdate, value)
  }, [])

  const wrapper = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.persist()
    setQuery(event.target.value)
    onAddressQueryChange(event.target.value)
  }

  return (
    <Toolbar>
      <div className={styles['header-container']}>
        <div className={styles['title-container']}>
          <h6>Список пациентов</h6>
          <a onClick={onCreatePatient}>Создать</a>
        </div>
        
        <div className={styles['search-bar']}>
          <TextField
            type="text"
            name="search"
            placeholder="Поиск..."
            value={localQueryString}
            onChange={wrapper}
          />
        </div>
      </div>
    </Toolbar>
  )
}


export default memo(PatientsHeader)