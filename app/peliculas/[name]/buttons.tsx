'use client'
import ContextAuth from '@/context/ContextAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, MouseEvent, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchDelete } from './actions/fetchDelete'

interface ButtonsProps {
  id: number
}

const Buttons: FC<ButtonsProps> = ({ id }) => {
  const router = useRouter()

  //Invoke Context
  const { error } = useContext(ContextAuth)
  useEffect(() => {
    error ? toast.error(error) : null
  })

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      if (confirm('Esta seguro que desea borrar la pelicula?')) {
        fetchDelete({ id }).then((response) => {
          console.log(response)
          if (response.data?.id) {
            toast.success('La pelicula ha sido eliminada correctamente', {
              onClose: () => {
                router.push('/')
              },
            })
          } else {
            toast.error('Ha ocurrido un error')
          }
        })
      }
    } catch (error) {
      console.error('Error deleting movie from favorites:', error)
      toast.error('Ha ocurrido un error')
    }
  }
  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        <span className="bi bi-trash" style={{ fontSize: '16px', color: 'rgb(254, 254, 254)' }}></span>
        Borrar
      </button>
      <ToastContainer />
      <Link href={`/peliculas/editar/${id}`}>
        <button className="btn btn-primary">
          <span className="bi bi-pencil" style={{ fontSize: '16px', color: 'rgb(254, 254, 254)' }}></span>
          Editar
        </button>
      </Link>
    </div>
  )
}

export default Buttons
