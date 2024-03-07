'use client'
import Layout from '@/components/Layout'
import { URL_API } from '@/config'
import ContextAuth from '@/context/ContextAuth'
import { unstable_noStore } from 'next/cache'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Registro = () => {
  unstable_noStore()
  const router = useRouter()
  //Invoke Context
  const { register, error } = useContext(ContextAuth)

  useEffect(() => {
    error ? toast.error(error) : null
  })
  const registerPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (formData.get('email') && formData.get('password') && formData.get('username')) {
      try {
        if (formData.get('password') !== formData.get('confirmPassword')) {
          toast.error('Los campos de contraseña no coinciden')
          return
        }
        const body: any = {
          username: formData.get('username'),
          email: formData.get('email'),
          password: formData.get('password'),
        }
        register({ ...body }).then((res: any) => {
          if (res.user) {
            toast.success('Registro con exito', {
              onClose: () => {
                router.push('/')
              },
            })
          }
        })
      } catch (err) {
        console.error('Error creating user:', err)
        toast.error('Ha ocurrido un error al registrarse')
      }
    } else {
      toast.error('Por favor, complete los campos')
    }
  }

  return (
    <Layout title="Registro">
      <div className="card mt-5">
        <h2 className="row g-3 mt-3 mx-5">Registro</h2>
        <ToastContainer />
        <form className="row g-3 my-2 mx-5" onSubmit={registerPost}>
          <div className="col-md-6">
            <label htmlFor="inputRegistroUsername" className="form-label">
              Usuario
            </label>
            <input name="username" type="text" className="form-control" id="inputRegistroUsername" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRegistroEmail" className="form-label">
              Email
            </label>
            <input name="email" type="email" className="form-control" id="inputRegistroEmail" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRegistroPassword" className="form-label">
              Contraseña
            </label>
            <input name="password" type="password" className="form-control" id="inputRegistroPassword" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRegistroConfirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              id="inputRegistroConfirmPassword"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>
        </form>
        <div className="card-footer">
          Ya estas registrado? <Link href="/users/acceso">Acceder</Link>
        </div>
      </div>
    </Layout>
  )
}
export default Registro
