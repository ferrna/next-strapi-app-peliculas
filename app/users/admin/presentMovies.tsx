import AdminPelicula from '@/components/AdminPelicula'

export default function PresentMovies({ favorites, userId }: { favorites: any[]; userId: number }) {
  return (
    <div>
      {favorites.length > 0 &&
        favorites.map((peli: any) => <AdminPelicula key={peli.enlaceUrl} {...peli} userId={userId} />)}
    </div>
  )
}
