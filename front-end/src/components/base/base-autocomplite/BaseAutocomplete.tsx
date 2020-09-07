import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

interface Props {
  value: any,
  label: string,
  error: boolean | undefined,
  helperText: string | undefined | false,
  suggestions: Array<any>,
  onChange: (value: any) => void,
  onInput: (value: any) => void,
  itemFormat: (params: any) => string
}

const BaseAddressSelector: React.FC<Props> = ({
  value, label, error, suggestions, helperText,
  onInput, onChange, itemFormat,
}) => {

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist()
    onInput(event.target.value)
  }

  return (
    <Autocomplete
      options={suggestions}
      value={value}
      getOptionLabel={itemFormat}
      filterOptions={options => options}
      onChange={
        (_, value: any) => onChange(value)
      }
      renderInput={
        params => <TextField {...params}
          label={label} error={error}
          helperText={helperText}
          onChange={onChangeHandler}
        />
      }
    />
  )
}

export default BaseAddressSelector


