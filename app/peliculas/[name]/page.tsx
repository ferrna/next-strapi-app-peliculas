import Layout from '@/components/Layout'
import { URL_API } from '@/config'
import Link from 'next/link'
import { FC } from 'react'
import styles from '@/styles/Detalles.module.css'
import { formatData } from '@/utils/formatData'
import { StarRating } from '@/utils/starRating'
import Buttons from './buttons'

interface DetalleProps {
  params: { name: string }
}

const Detalle: FC<DetalleProps> = async ({ params }) => {
  const { name } = params
  const res = await getData(name)
  const pelicula = formatData(res.data[0])

  return (
    <Layout title="Detalle de Pelicula">
      <div className="container my-4">
        <div className="card">
          <Buttons id={pelicula.id} />
          <div className="card-body">
            <div className="card text-bg-dark mb-3">
              <img src={pelicula.imagen} className={`card-img ${styles.pelicula_img}`} alt="..." />
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
        </div>
      </div>
    </Layout>
  )
}

export default Detalle

async function getData(param: string) {
  const res = await fetch(`${URL_API}/api/peliculas?filters[enlaceUrl][$eq]=${param}&populate=*`, {
    next: { revalidate: 1000 },
  })

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
