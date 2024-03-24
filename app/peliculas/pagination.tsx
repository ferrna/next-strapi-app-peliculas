import { URL_API } from '@/config'
import Pelicula from '@/components/Pelicula'
import { formatData } from '@/utils/formatData'
import Link from 'next/link'
import { unstable_noStore } from 'next/cache'

export default async function Pagination({
  page = 1,
  user,
}: {
  page: string | number
    user: { id?: number | null, peliculas: number[] } | null
}) {
  unstable_noStore()
  const limit = 3
  const start = Number(page) * limit - limit
  const { data, total } = await getData(Number(page), start)
  const lastPage = total <= limit * +page
  const peliculas = data.map((pelicula: any) => formatData(pelicula))
  return (
    <div className="my-5">
      {peliculas && peliculas.map((peli: any) => <Pelicula {...peli} user={user} />)}
      <div className="row mb-4">
        <div className="col-sm-6 offset-3 text-center">
          {+page > 1 && (
            <Link href={`/peliculas?page=${+page - 1}`}>
              <button className="btn btn-dark">
                <i className="bi bi-arrow-left-circle-fill"></i> Anterior
              </button>
            </Link>
          )}
          &nbsp;
          {!lastPage && (
            <Link href={`/peliculas?page=${+page + 1}`}>
              <button className="btn btn-dark">
                <i className="bi bi-arrow-right-circle-fill"></i> Siguiente
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

async function getData(page: number, start: number) {
  const total = await fetch(`${URL_API}/api/peliculas?populate=*`, {
    next: { revalidate: 30 },
  })
    .then(async (res) => await res.json())
    .then((res) => res.meta.pagination.total)

  const res = await fetch(
    `${URL_API}/api/peliculas?sort=createdAt:DESC&pagination[start]=${start}&pagination[limit]=3&populate=*`,
    {
      next: { revalidate: 30 },
    }
  )

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()
  return { data: data.data, total }
  console.log('any')
}
