'use client'
import Layout from '@/components/Layout'
import { URL_API } from '@/config'
import { formatData } from '@/utils/formatData'
import { useRouter } from 'next/navigation'
import { FC, FormEvent, useEffect } from 'react'
import ModalImport from './modalImport'

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
interface EditarProps {
  params: { id: string }
}

const Editar: FC<EditarProps> = async ({ params }) => {
  const { id } = params
  const router = useRouter()
  useEffect(() => {
    getData(id)
      .then((res) => formatData(res.data))
      .then((res) => res)
      .then((res: { [key: string]: any }) => {
        inputsMeta.forEach((input) => {
          Object.keys(res).forEach((key) => {
            if (key === input.name) {
              const inputElement = document.getElementById(`inputEdit${input.name}`) as
                | HTMLInputElement
                | HTMLTextAreaElement
              inputElement.value = res[key]
            }
          })
        })
      })
  }, [])
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    try {
      const bodyObj: any = {}
      inputsMeta.forEach((input) =>
        formData.get(input.name) ? (bodyObj[input.name] = formData.get(input.name)) : ''
      )
      const response = await fetch(`${URL_API}/api/peliculas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...bodyObj } }),
      })
      if (response.status === 200) {
        alert('Pelicula actualizada correctamente')
        router.push('/')
      } else {
        alert('Ha ocurrido un error al actualizar la pelicula')
      }
    } catch (error) {
      console.error('Error editando pelicula:', error)
      // Handle error
    }
  }
  return (
    <Layout title="Editar pelicula">
      <h2 className="row g-3 mt-3 ">Editar pelicula</h2>
      <form className="row g-3 my-2 " onSubmit={handleSubmit}>
        {inputsMeta.map((input) => (
          <div className="col-md-6" key={input.name}>
            <label htmlFor={`inputEdit${input.name}`} className="form-label">
              {input.label}
            </label>
            {input.type === 'textarea' ? (
              <textarea name={input.name} className="form-control" id={`inputEdit${input.name}`}></textarea>
            ) : (
              <input
                name={input.name}
                type={input.type}
                className="form-control"
                id={`inputEdit${input.name}`}
                required={!!input.required}
              />
            )}
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Editar pelicula
          </button>
        </div>
      </form>
      <ModalImport id={id} />
    </Layout>
  )
}
export default Editar

async function getData(id: string) {
  const res = await fetch(`${URL_API}/api/peliculas/${id}?populate=*`)

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
