'use client'
import { URL_API } from '@/config'
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface UploadImageProps {
  id: string
  setShowModal: Dispatch<SetStateAction<boolean>>
}
const UploadImage = ({ id, setShowModal }: UploadImageProps) => {
  const [imagen, setImagen] = useState<File>()
  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setImagen(e.target.files![0])
  }
  const onFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    if (imagen) {
      formData.append('files', imagen)
      formData.append('ref', 'api::pelicula.pelicula')
      formData.append('refId', id)
      formData.append('field', 'imagen')
      const response = await fetch(`${URL_API}/api/upload`, {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        confirm('Imagen subida con exito!') && setShowModal(false)
      }
    }
  }
  return (
    <div>
      <h3>Subir imagen</h3>
      <form onSubmit={onFileSubmit} className="was-validated">
        <div className="form-group mt-3">
          <input type="file" className="form-control" id="uploadImageInput" required onChange={onFileSelect} />

          {imagen && <div className="valid-feedback">Archivo seleccionado</div>}
          <button type="submit" className="btn btn-primary mt-3">
            <i className="bi bi-cloud-arrow-up"></i>Subir y Asignar imagen
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadImage
