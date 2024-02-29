'use client'
import { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'
import NavBar from './NavBar'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

const metadata: Metadata = {
  title: 'Next Strapi App Peliculas',
  description: 'Next Strapi App Peliculas',
}
interface CustomMetadata extends Metadata {
  children: React.ReactNode
}

const Layout = ({
  title = metadata.title,
  description = metadata.description,
  authors,
  keywords,
  children,
}: CustomMetadata) => {
  const pathname = usePathname()
  return (
    <div className="d-flex flex-column min-vh-100">
      <Head>
        <title>{title as string}</title>
        <meta name="description" content={description as string} />
        <meta name="authors" content="" />
        <meta name="keywords" content="next strapi" />
      </Head>
      <NavBar />
      {pathname === '/' && <Header />}
      <div className="container flex-grow-1 ">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
