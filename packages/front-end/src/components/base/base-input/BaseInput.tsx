import React from 'react'

interface Props {
  name: string,
  value: string,
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const BaseInput: React.FC<Props> = ({ onChangeHandler, value, name }) => {
  return (
    <input name={name} onChange={onChangeHandler} value={value}/>
  )
}

export default BaseInput
