import React from 'react'
import styles from '@/styles/Footer.module.css'

const Footer = ({}) => {
  return (
    <footer className={styles.footer}>
      <span>Peliculas app con Next y Strapi</span>
      <a href="" className="text-white" target="_blanck">
        author
      </a>
    </footer>
  )
}

export default Footer
