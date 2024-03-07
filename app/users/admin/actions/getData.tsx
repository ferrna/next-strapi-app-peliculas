'use server'
import { URL_API } from '@/config'
import { unstable_noStore } from 'next/cache'

export async function getData(user: any) {
  unstable_noStore()

  const response = await fetch(`${URL_API}/api/users/${user.id}?populate=*`)
  const userData = await response.json()
  const movies = userData.peliculas
  console.dir(movies)
  return movies
}
