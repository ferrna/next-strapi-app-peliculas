'use client'
import Layout from '@/components/Layout'
import Pelicula from '@/components/Pelicula'
import { URL_API } from '@/config'
import { formatData } from '@/utils/formatData'
import { unstable_noStore } from 'next/cache'
import { useSearchParams } from 'next/navigation'

const Busqueda = async () => {
  unstable_noStore()
  const searchParams = useSearchParams()

  const search = searchParams.get('search')
  const res = await getData(search || '')
  const peliculas = res.data.map((pelicula: any) => formatData(pelicula))
  return (
    <Layout title="Busqueda">
      <h2>Resultados</h2>
      {peliculas && peliculas.length < 1 ? (
        <span>Sin resultados</span>
      ) : (
        peliculas.map((peli: any) => <Pelicula {...peli} />)
      )}
    </Layout>
  )
}
export default Busqueda

async function getData(param: string) {
  const res = await fetch(`${URL_API}/api/peliculas?filters[titulo][$contains]=${param}&populate=*`, {
    next: { revalidate: 1000 },
  })

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
