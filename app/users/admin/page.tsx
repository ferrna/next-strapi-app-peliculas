'use client'
import Layout from '@/components/Layout'
import ContextAuth from '@/context/ContextAuth'
import { unstable_noStore } from 'next/cache'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { getData } from './actions/getData'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PresentMovies = React.lazy(() => import('./presentMovies'))

const Admin = () => {
  unstable_noStore()
  //Invoke Context
  const { user, error } = useContext(ContextAuth)
  const [peliculas, setPeliculas] = useState<any[]>([])
  useEffect(() => {
    user &&
      getData(user).then((res) => {
        setPeliculas(res)
        return
      })
  }, [user])
  return (
    <Layout title="Admin">
      <ToastContainer />

      <Suspense fallback={<span>Loading</span>}>
        <PresentMovies peliculas={peliculas} />
      </Suspense>
    </Layout>
  )
}
export default Admin
