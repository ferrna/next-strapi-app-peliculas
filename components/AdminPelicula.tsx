import React, { MouseEvent } from 'react'
import styles from '@/styles/Pelicula.module.css'
import Link from 'next/link'
import { NEXT_URL } from '@/config'
import { toast } from 'react-toastify'

interface Pelicula {
  id: number
  titulo: string
  enlaceUrl: string
  descripcion: string
  pais: string
  genero: string
  director: string
  guion: string
  calificacion: string
  fechaEstreno: string
}
const AdminPelicula = ({ id, titulo, descripcion, enlaceUrl, fechaEstreno }: Pelicula) => {
  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    /* try {
      const response = await fetch(`${NEXT_URL}/api/peliculas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        toast.success('La pelicula ha sido quitada de favoritos')
      } else {
        toast.error('Ha ocurrido un error')
      }
    } catch (error) {
      console.error('Error deleting movie from pavorites:', error)
      toast.error('Ha ocurrido un error')
    } */
  }
  return (
    <div className="card text-bg-dark mb-4" style={{ minHeight: '180px' }} key={enlaceUrl}>
      <div className={`${styles.pelicula_img} py-2 px-1`}>
        <h3>{titulo}</h3>
      </div>
      <div className={`card-img-overlay ${styles.pelicula_details}`}>
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
          <button
            className="btn btn-danger my-2 mx-1"
            style={{ backgroundColor: 'rgb(170, 0, 0)', borderColor: 'rgb(170, 0, 0)' }}
            onClick={handleDelete}
          >
            <i className="bi bi-star-fill red fs-6 "></i>Quitar de favoritos
          </button>
        </p>
      </div>
    </div>
  )
}

export default AdminPelicula
