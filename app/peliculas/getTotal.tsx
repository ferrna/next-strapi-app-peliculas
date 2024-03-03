/* 'use client'
import { URL_API } from '@/config'
import { Dispatch, SetStateAction, useEffect } from 'react'

export default function GetTotal({
  setTotal,
  total,
}: {
  setTotal: Dispatch<SetStateAction<number>>
  total: number
}) {
  fetch(`${URL_API}/api/peliculas?populate=*`, {
    next: { revalidate: 30 },
  }).then((res) => res.json().then((res) => setTotal(res.meta.pagination.total)))

  return <div></div>
}
 */
