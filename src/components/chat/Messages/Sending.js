import React from 'react'
import LogoMegaHackWoman from '../../../icons/person.svg'
import 'react-typewriting-effect/dist/index.css'

export const Sending = ({ text }) => {
  return (
    <div className="chat-message">
      <div className="sending-message">
        { text }
      </div>
      <div className="icon">
        <img src={LogoMegaHackWoman} alt="logo" />
      </div>
    </div>
  )
}
