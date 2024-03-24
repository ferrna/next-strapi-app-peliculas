'use client'
import React, { useState } from 'react'
import styles from '@/styles/Pelicula.module.css'
import Link from 'next/link'
import imagenTemp from '@/public/imagenes/pelicula-temp.jpg'
import Image from 'next/image'
import { URL_API } from '@/config'
import { ToastContainer, toast } from 'react-toastify'

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
  imagenSmall: string
  calificacion: string
  fechaEstreno: string
}
interface PeliculaProps extends Pelicula {
  user: { id?: number | null; peliculas: number[] } | null
}
const Pelicula = ({ id, titulo, descripcion, enlaceUrl, imagenSmall, fechaEstreno, user }: PeliculaProps) => {
  console.log(user)
  const [isUserFavorites, setIsUserFavorites] = useState(user ? user?.peliculas?.includes(id) : false)
  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data_body = {
      peliculas: {
        connect: [{ id: id }],
      },
    }
    fetch(`${URL_API}/api/users/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_body),
    }).then((response) => {
      if (response.status === 200) {
        setIsUserFavorites(!isUserFavorites)
        toast.success('La pelicula se ha añadido a favoritos')
      } else {
        toast.error('Ha ocurrido un error')
      }
    })
  }
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data_body = {
      peliculas: {
        disconnect: [{ id: id }],
      },
    }
    fetch(`${URL_API}/api/users/${user?.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_body),
    }).then((response) => {
      if (response.status === 200) {
        setIsUserFavorites(!isUserFavorites)
        toast.success('La pelicula ha sido quitada de favoritos')
      } else {
        toast.error('Ha ocurrido un error')
      }
    })
  }
  return (
    <div className="card text-bg-dark mb-5" style={{ minHeight: '180px' }} key={enlaceUrl}>
      <Image
        src={imagenSmall || imagenTemp}
        width={200}
        height={300}
        className={`card-img ${styles.pelicula_img}`}
        alt="..."
      />
      <div className={`card-img-overlay ${styles.pelicula_details}`}>
        <h5 key={titulo} className="card-title">
          {titulo}
        </h5>
        <p key={titulo + 'description'} className={`card-text ${styles.pelicula_description}`}>
          {descripcion}
        </p>
        <p key={titulo + 'text'} className="card-text">
          <small>{fechaEstreno}</small>
          <button className="btn btn-info m-2">
            <Link href={`/peliculas/${enlaceUrl}`} className="text-decoration-none">
              Ver detalles
            </Link>
          </button>
          {user?.id && (
            <button
              className={`btn ${isUserFavorites ? 'btn-danger' : 'btn-outline-danger'} m-2`}
              onClick={isUserFavorites ? handleRemove : handleFavorite}
            >
              {isUserFavorites ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
          )}
        </p>
      </div>
    </div>
  )
}

export default Pelicula
