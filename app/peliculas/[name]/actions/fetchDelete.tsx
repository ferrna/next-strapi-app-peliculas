import { NEXT_URL } from '@/config'

export const fetchDelete = async ({ id }: { id: number }) => {
  const response = await fetch(`${NEXT_URL}/api/peliculas/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}
