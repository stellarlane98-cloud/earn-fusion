'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type AuthState = {
  isAuthenticated: boolean
  user: { id: string; name: string; email: string; username: string } | null
  login: (email: string, password: string, name?: string) => void
  register: (name: string, username: string, email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthStoreProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<AuthState['user']>(null)

  // Load user from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem('auth_user')
    if (stored) {
      try {
        const userData = JSON.parse(stored)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (e) {
        // Invalid data, ignore
      }
    }
  }, [])

  const login = (email: string, password: string, name?: string) => {
    // Frontend-only simulation
    if (email && password) {
      const userData = {
        id: email.toLowerCase().replace(/[^a-z0-9]/g, ''),
        name: name || email.split('@')[0],
        email,
        username: email.split('@')[0],
      }
      setIsAuthenticated(true)
      setUser(userData)
      localStorage.setItem('auth_user', JSON.stringify(userData))
    }
  }

  const register = (name: string, username: string, email: string, password: string) => {
    // Frontend-only simulation
    if (name && username && email && password) {
      const userData = {
        id: email.toLowerCase().replace(/[^a-z0-9]/g, ''),
        name,
        username,
        email,
      }
      setIsAuthenticated(true)
      setUser(userData)
      localStorage.setItem('auth_user', JSON.stringify(userData))
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthStoreProvider')
  }
  return context
}
