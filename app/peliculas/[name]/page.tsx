'use client'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { FC, useContext, useEffect, useState } from 'react'
import styles from '@/styles/Detalles.module.css'
import { StarRating } from '@/utils/starRating'
import Buttons from './buttons'
import imagenTemp from '@/public/imagenes/pelicula-temp.jpg'
import Image from 'next/image'
import ContextAuth from '@/context/ContextAuth'
import { getData } from './actions/getData'

interface DetalleProps {
  params: { name: string }
}

const Detalle: FC<DetalleProps> = ({ params }) => {
  const { name } = params
  const { user } = useContext(ContextAuth)
  const [pelicula, setPelicula] = useState<any>()
  !pelicula &&
    getData(name).then((res) => {
      setPelicula(res)
      return
    })
  return (
    <Layout title="Detalle de Pelicula">
      <div className="container my-4">
        <div className="card">
          {user && pelicula?.id && <Buttons id={pelicula.id} />}
          {pelicula?.titulo && (
            <div className="card-body">
              <div className="card text-bg-dark mb-3">
                <Image
                  src={pelicula.imagen || imagenTemp}
                  width={300}
                  height={400}
                  className={`card-img ${styles.pelicula_img}`}
                  alt="..."
                />
                <div className={`card-img-overlay ${styles.pelicula_details}`}>
                  <h2 className="card-title">{pelicula.titulo}</h2>
                  <small>{pelicula.fechaEstreno}</small>
                  <span className="card-text">
                    <p className={`card-text ${styles.pelicula_description}`}>{pelicula.descripcion}</p>
                    <StarRating calificacion={pelicula.calificacion} />
                    <button className="btn btn-primary btn-rounded m-2">
                      <Link href={`/peliculas/`} className="text-decoration-none">
                        Agregar a favoritos
                      </Link>
                    </button>
                  </span>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h3 className="box-title">Informacion General</h3>
                <div className="table-responsive">
                  <table className="table table-striped table-product">
                    <tbody>
                      <tr>
                        <td width="390">Genero</td>
                        <td>{pelicula.genero}</td>
                      </tr>
                      <tr>
                        <td>Director</td>
                        <td>{pelicula.director}</td>
                      </tr>
                      <tr>
                        <td>Guion</td>
                        <td>{pelicula.guion}</td>
                      </tr>
                      <tr>
                        <td>Fecha de Estreno</td>
                        <td>{pelicula.fechaEstreno}</td>
                      </tr>
                      <tr>
                        <td>Pais</td>
                        <td>{pelicula.pais}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Detalle
