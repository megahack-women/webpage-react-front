import React, { createContext, useState, useContext, useEffect } from 'react'
import localforage from 'localforage'
import history  from '../routes/history'
import {
  setTokenHeader, 
  removeTokenHeader
} from '../services/auth'
import { useErrors } from './Error'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const { pushError } = useErrors()
  
  const { REACT_APP_COOKIE_KEY } = process.env

  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    token: ''
  })

  useEffect(() => {
    (async () => { 
      // verificar se cookie ainda é valido
      const token = await localforage.getItem(REACT_APP_COOKIE_KEY)
      if (token) {
        setTokenHeader(token)
        setAuthenticated(true)
      }
      setLoading(false)
    })()
  }, [authenticated, REACT_APP_COOKIE_KEY])

  const signIn = async (response) => {
    try {
      // const response = await login(credentials)
      const { user, token }  = response
      if (user) {
        setAuthenticated(true)
        setTokenHeader(token)
        setUserInfo({ email: user.email, name: user.name, token })
        await localforage.setItem(REACT_APP_COOKIE_KEY, token)
        history.push('/chat-page')
      }
    } catch (err) {
      if (err.response) {
        const { response: { status } } = err
        pushError({ type: 'request', status })
      } else {
        pushError({ type: 'request', status: 500 })
      }
    }
  }

  const signOut = () => {
    setAuthenticated(false)
    removeTokenHeader()
    localforage.removeItem(REACT_APP_COOKIE_KEY)
    history.push('/')
  }

  return (
    <AuthContext.Provider value={
      {
        userInfo,
        authenticated,
        loading,
        signIn,
        signOut
      }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) throw new Error('useAuth must be used within a AuthProvider')
  const { userInfo, authenticated, loading, signIn, signOut } = context
  return {
    userInfo,
    authenticated,
    loading,
    signIn,
    signOut
  }
}

export default AuthProvider
