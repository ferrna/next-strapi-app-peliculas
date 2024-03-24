'use client'
import React, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NEXT_URL } from '@/config'

const ContextAuth = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  //Instance router
  const router = useRouter()

  //Validate authenticated user
  useEffect(() => {
    validate()
  }, [])
  //Register a new user
  const register = async ({
    email,
    username,
    password,
  }: {
    email: string
    username: string
    password: string
  }) => {
    const response = await fetch(`${NEXT_URL}/api/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    })
    const data = await response.json()
    if (data.user) {
      //setUser(data.user)
      setError(null)
      //router.push('/users/acceso')
      return data
    } else {
      setError(data.error.message)
      return data.error
    }
  }

  //Auth user
  const auth = async ({ identifier, password }: { identifier: string; password: string }) => {
    const response = await fetch(`${NEXT_URL}/api/acceso`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await response.json()
    if (data.user) {
      setUser(data.user)
      setError(null)
      //router.push('/')
      return data
    } else {
      setError(data.error.message)
      return data.error
    }
  }

  //Close session
  const close = async () => {
    console.log('charge close')
    const response = await fetch(`${NEXT_URL}/api/closeSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    if (data) {
      setUser(null)
      router.push('/')
      return data
    } else {
      setError(data.error.message)
      return data.error
    }
  }

  //Validate user
  const validate = () => {
    console.log('charge validation')
    fetch(`${NEXT_URL}/api/usuario`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          data.peliculas = data.peliculas.map((peli: { id: number }) => peli.id)
          setUser({ user, ...data })
        } else {
          setUser(null)
        }
      })
  }

  return <ContextAuth.Provider value={{ user, error, register, auth, close }}>{children}</ContextAuth.Provider>
}

export default ContextAuth
