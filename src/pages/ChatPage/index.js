import React from 'react'
import { ChatBot } from '../../components/chat'
import ChatProvider from '../../context/Chat'

const Home = () => {
  return(
      <div className="container-chat-bot">
        <ChatBot />
      </div>
  )
}

export default Home
