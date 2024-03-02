'use client'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { useState } from 'react'

export default function Peliculas() {
  const [showModal, setShowModal] = useState(false)
  return (
    <Layout title="Lista de Peliculas">
      <h1>Peliculas</h1>
      <div>
        <button onClick={() => setShowModal(true)}>Open Modal</button>
        {showModal && <Modal onClose={() => setShowModal(false)}></Modal>}
      </div>
    </Layout>
  )
}
