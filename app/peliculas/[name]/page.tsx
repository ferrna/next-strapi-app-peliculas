'use client'
import Layout from '@/components/Layout'
import { FC } from 'react'

interface DetalleProps {
  params: { name: string }
}
const Detalle: FC<DetalleProps> = ({ params }) => {
  const { name } = params
  return (
    <Layout title="Detalle de Pelicula">
      <h1>Detalles {name}</h1>
    </Layout>
  )
}

export default Detalle
