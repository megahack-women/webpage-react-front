import React, { useEffect } from 'react'
import { useAuth } from '../../context/Auth'

const { REACT_APP_MEUID_APP_ID } = process.env

const LoginMeuIdForm = () => {
  const { signIn } = useAuth()

  useEffect(() => {
    const meuID = window.meuID
    meuID.initialize({
      appId: REACT_APP_MEUID_APP_ID || 'c5bb4e97-9a6d-46a9-ad81-9a25f818af7b',
      onLogin: response => {
        // lidar com o usuário autenticado.
        console.log(response)
        signIn(response)
      }
    })
  }, [signIn])

  return (
    <>
      <form className="register-form-container">
        <div 
          id="meuid-login" 
          data-size="medium" 
          data-theme="white" 
          data-label="Comprovar identidade"></div>
      </form>
    </>
  )
}

export default LoginMeuIdForm
