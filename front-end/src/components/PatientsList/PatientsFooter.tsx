import React, { memo, useState } from 'react'
import { TablePagination } from '@material-ui/core'

interface Props {
  total: number,
  page: number,
  pageChange: (page:number) => void
}

const PatientsFooter: React.FC<Props> = ({ total, page, pageChange }) => {
  return (
    <TablePagination
      component="div"
      count={total || 0}
      rowsPerPage={10}
      rowsPerPageOptions={[]}
      page={page}
      onChangePage={(_, page) => pageChange(page)}
    />
  )
}

export default memo(PatientsFooter)