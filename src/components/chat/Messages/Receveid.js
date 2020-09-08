import React from 'react'
import { Typewriter } from 'react-typewriting-effect'
import LogoMegaHackWoman from '../../../icons/dinmais.svg'
import 'react-typewriting-effect/dist/index.css'

export const Receveid = ({ text }) => {
  return (
    <div className="chat-message">
      <div className="icon">
        <img src={LogoMegaHackWoman} alt="logo" />
      </div>
      <div className="receveid-message">
        <Typewriter delay={1} string={text} stopBlinkinOnComplete />
      </div>
    </div>
  )
}
