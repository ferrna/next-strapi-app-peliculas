'use client'
import Layout from '@/components/Layout'
import { unstable_noStore } from 'next/cache'
import { useSearchParams } from 'next/navigation'
import Pagination from './pagination'
import ContextAuth from '@/context/ContextAuth'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'

const Busqueda = () => {
  unstable_noStore()
  const { user } = useContext(ContextAuth)
  const searchParams = useSearchParams()

  const search = searchParams.get('search')
  const page = searchParams.get('page') || '1'
  return (
    <Layout title="Busqueda">
      <ToastContainer />
      {page && <Pagination param={search} page={page} user={{ id: user?.id, peliculas: user?.peliculas }} />}
    </Layout>
  )
}
export default Busqueda
