import React from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined,
  caption: string,
  onClickHandler?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const BaseButton: React.FC<Props> = ({onClickHandler, caption, type = 'button'}) => {
  return (
    <button type={type} onClick={onClickHandler}>
      {caption}
    </button>
  )
}

export default BaseButton
