import { URL_API } from '@/config'
import { formatData } from '@/utils/formatData'

export async function getData(param: string) {
  const rawRes = await fetch(`${URL_API}/api/peliculas?filters[enlaceUrl][$eq]=${param}&populate=*`, {
    next: { revalidate: 20 },
  })

  if (rawRes.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const res = await rawRes.json()
  return formatData(res.data[0])
}
