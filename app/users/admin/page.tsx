'use client'
import Layout from '@/components/Layout'
import { unstable_noStore } from 'next/cache'

const Registro = async () => {
  unstable_noStore()

  return (
    <Layout title="Admin">
      <h1></h1>
    </Layout>
  )
}
export default Registro
