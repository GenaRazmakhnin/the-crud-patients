import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

interface Props {
  open: boolean,
  title: string
}

const Modal: React.FC<Props> = ({ open, title, children }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  )
}

export default Modal