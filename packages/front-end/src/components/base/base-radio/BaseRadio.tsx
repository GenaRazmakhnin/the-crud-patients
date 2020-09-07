import React from 'react'

interface Props {
  value: boolean,
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const BaseRadio: React.FC<Props> = ({ value, onChangeHandler }) => {
  return (
    <input type="radio" onChange={onChangeHandler} checked={value}/>
  );
}

export default BaseRadio
