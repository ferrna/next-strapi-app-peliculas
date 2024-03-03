'use client'
import Link from 'next/link'
import React, { FC, FormEvent } from 'react'
import styles from '@/styles/NavBar.module.css'
import { useRouter } from 'next/navigation'
interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')
    router.push(`/busqueda?search=${search}`)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link href="/">
          <div className={styles.logo}></div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/peliculas">
                Peliculas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/peliculas/agregar">
                Agregar
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search" action="#" method="GET" onSubmit={handleSubmit}>
            <input
              id="search"
              name="search"
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              required
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
