'use client'
import Layout from '@/components/Layout'
import { URL_API } from '@/config'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inputsMeta = [
  {
    name: 'titulo',
    label: 'Titulo',
    type: 'text',
    required: true,
  },
  {
    name: 'pais',
    label: 'Pais',
    type: 'text',
  },
  {
    name: 'genero',
    label: 'Genero',
    type: 'text',
  },
  {
    name: 'director',
    label: 'Director',
    type: 'text',
  },
  {
    name: 'guion',
    label: 'Guion',
    type: 'text',
  },
  {
    name: 'calificacion',
    label: 'Calificacion',
    type: 'number',
  },
  {
    name: 'descripcion',
    label: 'Descripcion',
    type: 'textarea',
  },
  {
    name: 'fechaEstreno',
    label: 'Fecha de estreno',
    type: 'Date',
  },
]

const Agregar = async () => {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const bodyObj: any = {}
      inputsMeta.forEach((input) =>
        formData.get(input.name) ? (bodyObj[input.name] = formData.get(input.name)) : ''
      )
      const response = await fetch(`${URL_API}/api/peliculas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...bodyObj } }),
      })
      if (response.status === 200) {
        toast.success('Pelicula creada correctamente', {
          onClose: () => {
            router.push('/')
          },
        })
      } else {
        toast.error('Ha ocurrido un error al crear la pelicula')
        // Handle other response statuses (e.g., validation errors)
      }
    } catch (error) {
      console.error('Error creating pelicula:', error)
      toast.error('Ha ocurrido un error al crear la pelicula')
    }
  }
  return (
    <Layout title="Crear pelicula">
      <h2 className="row g-3 mt-3 ">Crear pelicula</h2>
      <ToastContainer />
      <form className="row g-3 my-2 " onSubmit={handleSubmit}>
        {inputsMeta.map((input) => (
          <div className="col-md-6" key={input.name}>
            <label htmlFor={`inputCrear${input.name}`} className="form-label">
              {input.label}
            </label>
            {input.type === 'textarea' ? (
              <textarea name={input.name} className="form-control" id={`inputCrear${input.name}`}></textarea>
            ) : (
              <input
                name={input.name}
                type={input.type}
                className="form-control"
                id={`inputCrear${input.name}`}
                required={!!input.required}
              />
            )}
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Crear pelicula
          </button>
        </div>
      </form>
    </Layout>
  )
}
export default Agregar
