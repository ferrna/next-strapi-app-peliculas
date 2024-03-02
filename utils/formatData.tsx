export const formatData = (data: any) => {
  const attributes: any = {}
  attributes.id = data.id
  attributes.titulo = data.attributes.titulo
  attributes.enlaceUrl = data.attributes.enlaceUrl
  /* attributes.descripcion = data.attributes.descripcion ? data.attributes.descripcion[0]?.children[0]?.text : '' */
  attributes.descripcion = data.attributes.descripcion
  attributes.pais = data.attributes.pais
  attributes.genero = data.attributes.genero
  attributes.director = data.attributes.director
  attributes.guion = data.attributes.guion
  attributes.calificacion = data.attributes.calificacion
  attributes.fechaEstreno = data.attributes.fechaEstreno
  attributes.imagen = data.attributes.imagen?.data?.attributes?.url
  attributes.imagenSmall = data.attributes.imagen?.data?.attributes?.formats?.small?.url
  return attributes
}
