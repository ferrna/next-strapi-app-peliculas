'use client'
import Layout from '@/components/Layout'
import { useSearchParams } from 'next/navigation'
import Pagination from './pagination'
import { unstable_noStore } from 'next/cache'
import ContextAuth from '@/context/ContextAuth'
import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

export default function Peliculas() {
  unstable_noStore()
  const { user } = useContext(ContextAuth)
  useEffect(() => {
    if (user) {
      /* fetch(`${URL_API}/api/users/${user.id}?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }) */
      console.log(user)
    }
  }, [user])
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1'
  return (
    <Layout>
      <ToastContainer />
      {page && <Pagination page={page} user={{ id: user?.id, peliculas: user?.peliculas }} />}
    </Layout>
  )
}
