'use client'
import { URL_API } from '@/config'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface ButtonsProps {
  id: number
}

const Buttons: FC<ButtonsProps> = ({ id }) => {
  const router = useRouter()
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (confirm('Esta seguro que desea borrar la pelicula?')) {
        const response = await fetch(`${URL_API}/api/peliculas/${id}`, {
          method: 'DELETE',
        })
        if (response.status === 200) {
          alert('Pelicula BORRADA correctamente')
        } else {
          // Handle other response statuses (e.g., validation errors)
        }
      }
    } catch (error) {
      console.error('Error borrando pelicula:', error)
      // Handle error
    }
    router.push(`/`)
  }
  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        <span className="bi bi-trash" style={{ fontSize: '16px', color: 'rgb(254, 254, 254)' }}></span>
        Borrar
      </button>

      <button className="btn btn-primary">
        <span className="bi bi-pencil" style={{ fontSize: '16px', color: 'rgb(254, 254, 254)' }}></span>
        Editar
      </button>
    </div>
  )
}

export default Buttons
