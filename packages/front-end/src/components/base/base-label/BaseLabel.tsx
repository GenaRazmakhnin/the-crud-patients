import React from 'react'

interface Props {
  title: string
}

const BaseLabel: React.FC<Props> = ({ title, children }) => {
  return (
    <label>
      { title }
      { children }
    </label>
  )
}

export default BaseLabel
