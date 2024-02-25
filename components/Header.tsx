import React from 'react'
import styles from '@/styles/Header.module.css'

const Header = ({}) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.padding}>Administrador de Peliculas</h1>
      <h2>Encuentra la mas amplia seleccion</h2>
    </div>
  )
}

export default Header
