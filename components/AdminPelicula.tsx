'use client'
import React, { MouseEvent } from 'react'
import styles from '@/styles/Pelicula.module.css'
import Link from 'next/link'
import { URL_API } from '@/config'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

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
interface AdminPeliculaProps extends Pelicula {
  userId: number
}
const AdminPelicula = ({ id, titulo, descripcion, enlaceUrl, fechaEstreno, userId }: AdminPeliculaProps) => {
  const router = useRouter()
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const data_body = {
        peliculas: {
          disconnect: [{ id: id }],
        },
      }
      fetch(`${URL_API}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_body),
      }).then((response) => {
        if (response.status === 200) {
          toast.success('La pelicula ha sido quitada de favoritos', {
            onClose: () => {
              router.push('/users/admin')
            },
          })
        } else {
          toast.error('Ha ocurrido un error')
        }
      })
    } catch (error) {
      console.error('Error deleting movie from favorites:', error)
      toast.error('Ha ocurrido un error')
    }
  }
  return (
    <div className="card text-bg-dark mb-4" style={{ minHeight: '180px' }}>
      <div className={`${styles.pelicula_img} py-2 px-1`}>
        <h3>{titulo}</h3>
      </div>
      <div className={`card-img-overlay ${styles.pelicula_details}`}>
        <p className={`card-text ${styles.pelicula_description}`}>{descripcion}</p>
        <p className="card-text">
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
