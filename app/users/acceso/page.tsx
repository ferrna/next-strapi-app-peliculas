'use client'
import Layout from '@/components/Layout'
import ContextAuth from '@/context/ContextAuth'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Acceso = async () => {
  unstable_noStore()
  const router = useRouter()
  //Invoke Context
  const { auth, error } = useContext(ContextAuth)
  const accessPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData.get('email') + 'formdata')
    try {
      const body: any = {
        identifier: formData.get('email'),
        password: formData.get('password'),
      }
      auth({ identifier: body.identifier, password: body.password }).then((res: any) => {
        if (res.user) {
          toast.success('Acceso con exito', {
            onClose: () => {
              router.push('/')
            },
          })
        } else {
          toast.error('Ha ocurrido un error al acceder')
          // Handle other response statuses (e.g., validation errors)
        }
      })
    } catch (err) {
      console.error('Error creating user:', error)
      toast.error('Ha ocurrido un error al acceder')
    }
  }

  return (
    <Layout title="Acceso">
      <div className="card">
        <h2 className="row g-3 mt-3 mx-5">Acceso</h2>
        <ToastContainer />
        <form className="row g-3 my-2 mx-5" onSubmit={accessPost}>
          {/* <div className="col-md-6">
            <label htmlFor="inputAccesoUsername" className="form-label">
              Usuario
            </label>
            <input name="username" type="text" className="form-control" id="inputAccesoUsername" required />
          </div> */}
          <div className="col-md-6">
            <label htmlFor="inputAccesoEmail" className="form-label">
              Email
            </label>
            <input name="email" type="email" className="form-control" id="inputAccesoEmail" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAccesoPassword" className="form-label">
              Contraseña
            </label>
            <input name="password" type="password" className="form-control" id="inputAccesoPassword" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Acceder
            </button>
          </div>
        </form>
        <div className="card-footer">
          No estas registrado? <Link href="/users/Acceso">acceder</Link>
        </div>
      </div>
    </Layout>
  )
}
export default Acceso
