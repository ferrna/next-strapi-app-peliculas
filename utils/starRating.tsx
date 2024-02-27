export const StarRating = ({ calificacion }: { calificacion: number }) => {
  const stars = []
  for (let i = 0; i < calificacion; i++) {
    stars.push(
      <span key={i} className="bi bi-star-fill" style={{ fontSize: '20px', color: 'rgb(255, 210, 48)' }}></span>
    )
  }
  const blankNumber = 5 - calificacion
  if (blankNumber > 0) {
    for (let i = 0; i < blankNumber; i++) {
      stars.push(
        <span key={i} className="bi bi-star" style={{ fontSize: '20px', color: 'rgb(255, 210, 48)' }}></span>
      )
    }
  }

  return (
    <div>
      {'Calificacion: '}
      {stars}&nbsp;
      {calificacion + '/5'}
    </div>
  )
}
