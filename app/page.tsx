import Layout from '@/components/Layout'
import { URL_API } from '@/config'

export default async function Home() {
  const { peliculas } = await getData()

  return (
    <Layout>
      {peliculas &&
        peliculas.map((peli: any) => (
          <div key={peli.id}>
            <h3>{peli.titulo}</h3>
            <span>{peli.descripcion}</span>
            <img src={peli.imagen} alt="" />
          </div>
        ))}
      <main className="min-vh-100 w-100 mt-4 ">
        <div className="accordion col-md-6 mx-auto " id="accordionPanelsStayOpenExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Accordion Item #1
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the
                collapse plugin adds the appropriate classNamees that we use to style each element. These
                classNamees control the overall appearance, as well as the showing and hiding via CSS
                transitions. You can modify any of this with custom CSS or overriding our default variables.
                It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
                though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Accordion Item #2
              </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                collapse plugin adds the appropriate classNamees that we use to style each element. These
                classNamees control the overall appearance, as well as the showing and hiding via CSS
                transitions. You can modify any of this with custom CSS or overriding our default variables.
                It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
                though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Accordion Item #3
              </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                collapse plugin adds the appropriate classNamees that we use to style each element. These
                classNamees control the overall appearance, as well as the showing and hiding via CSS
                transitions. You can modify any of this with custom CSS or overriding our default variables.
                It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>,
                though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

async function getData() {
  const res = await fetch(`${URL_API}/api/peliculas`, { next: { revalidate: 100 } })

  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
