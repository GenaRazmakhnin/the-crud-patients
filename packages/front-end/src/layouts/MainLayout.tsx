import React from 'react'
import style from './main-layout.module.scss'

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className={style.container}>
      {children}
    </div>
  );
}

export default MainLayout
