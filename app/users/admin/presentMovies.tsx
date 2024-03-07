import AdminPelicula from '@/components/AdminPelicula'

export default function PresentMovies({ peliculas }: { peliculas: any[] }) {
  return (
    <div className="mb-5">
      <br />
      <h3 className="mx-3 mt-4">Mis peliculas</h3>
      {peliculas.length > 0 && peliculas.map((peli: any) => <AdminPelicula {...peli} />)}
    </div>
  )
}
