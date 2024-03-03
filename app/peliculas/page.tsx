'use client'
import Layout from '@/components/Layout'
import { useSearchParams } from 'next/navigation'
import Pagination from './pagination'
import { unstable_noStore } from 'next/cache'

export default function Peliculas() {
  unstable_noStore()
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1'
  return <Layout>{page && <Pagination page={page} />}</Layout>
}
