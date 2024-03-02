'use client'
import Modal from '@/components/Modal'
import React, { useState } from 'react'

const ModalImport = ({}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <div>
      <div>
        <button onClick={() => setShowModal(true)}>Open Modal</button>
        {showModal && <Modal onClose={() => setShowModal(false)}>Hello from modal!</Modal>}
      </div>
    </div>
  )
}

export default ModalImport
