import Layout from '@/components/Layout'
import { URL_API } from '@/config'
import Pelicula from '@/components/Pelicula'
import { formatData } from '@/utils/formatData'

export default async function Home() {
  const { data } = await getData()
  const peliculas = data.map((pelicula: any) => formatData(pelicula))
  return <Layout>{peliculas && peliculas.map((peli: any) => <Pelicula {...peli} />)}</Layout>
}

async function getData() {
  const res = await fetch(
    `${URL_API}/api/peliculas?sort=createdAt:DESC&pagination[start]=0&pagination[limit]=3&populate=*`,
    {
      next: { revalidate: 30 },
    }
  )

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
