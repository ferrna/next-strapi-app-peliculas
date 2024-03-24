'use client'
import Layout from '@/components/Layout'
import ContextAuth from '@/context/ContextAuth'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { getData } from './actions/getData'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PresentMovies = React.lazy(() => import('./presentMovies'))

const Admin = () => {
  //Invoke Context
  const { user } = useContext(ContextAuth)
  const [favorites, setFavorites] = useState<any[]>([])
  const [haveFavorites, setHaveFavorites] = useState<boolean | null>(null)
  useEffect(() => {
    user?.id &&
      getData(user).then((res) => {
        setFavorites(res)
        setHaveFavorites(res.length > 0 ? true : false)
        return
      })
  }, [user])
  return (
    <Layout title="Admin">
      <div className="mb-5">
        <br />
        <h3 className="mx-3 mt-4">Mis peliculas</h3>
        <ToastContainer />
        <Suspense fallback={<span>Loading</span>}>
          {haveFavorites ? (
            <PresentMovies favorites={favorites} userId={user?.id} />
          ) : (
            haveFavorites === false && <div>No tienes peliculas en favoritos</div>
          )}
        </Suspense>
      </div>
    </Layout>
  )
}
export default Admin
