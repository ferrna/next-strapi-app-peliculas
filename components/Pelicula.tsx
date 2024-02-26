import React from 'react'
import styles from '@/styles/Pelicula.module.css'
import Link from 'next/link'

interface Pelicula {
  id: number
  titulo: string
  enlaceUrl: string
  descripcion: string
  pais: string
  genero: string
  director: string
  guion: string
  imagen: string
  calificacion: string
  fechaEstreno: string
}
const Pelicula = ({ titulo, descripcion, enlaceUrl, imagen, fechaEstreno }: Pelicula) => {
  return (
    <div className="card text-bg-dark mb-5">
      <img src={imagen} className={`card-img ${styles.pelicula_img}`} alt="..." />
      <div className={`card-img-overlay ${styles.pelicula_details}`}>
        <h5 className="card-title">{titulo}</h5>
        <p className={`card-text ${styles.pelicula_description}`}>{descripcion}</p>
        <p className="card-text">
          <small>{fechaEstreno}</small>
          <button className="btn btn-info m-2">
            <Link href={`/peliculas/${enlaceUrl}`} className="text-decoration-none">
              Ver detalles
            </Link>
          </button>
        </p>
      </div>
    </div>
  )
}

export default Pelicula
