'use client'
import Modal from '@/components/Modal'
import React, { useState } from 'react'
import UploadImage from './uploadImage'

interface ModalImportProps {
  id: string
}
const ModalImport = ({ id }: ModalImportProps) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="row g-3 my-2">
      <div className="col-12">
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Agregar/Editar Imagen
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UploadImage id={id} setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </div>
  )
}

export default ModalImport
