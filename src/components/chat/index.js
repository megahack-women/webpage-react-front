import React, { useRef, useState, useEffect } from 'react'
import { useChat } from '../../context/Chat'
import { Header } from './Header'
import { Footer } from './Footer'
import { Receveid } from './Messages/Receveid'
import './chatbot.scss'
import { Sending } from './Messages/Sending'
import { getMessage } from '../../services/chat'

const getTypeMessage = (message, index) => {
  return message.received ? 
    <Receveid key={index} text={message.text} /> : 
    <Sending key={index} text={message.text} />
}

export const ChatBot = () => {
  const { messages, setMessages, responses, setResponses } = useChat()
  const scrollableContent = useRef(null);
  const [footerHeight, setFooterHeight] = useState(86);

  const scrollToBottom = () => {
    scrollableContent.current.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest"});
  }

  useEffect(() => {
    scrollableContent.current.scrollIntoView({ behavior: 'smooth', block: "end", inline: "nearest"});
    (async () => {
      const res = await getMessage('question_name')
      setMessages([...messages, ...res.messages ])
      setResponses(res)
    })()
  }, [setMessages, setResponses]);

  const getPaddingFooter = () => {
    return footerHeight ? { paddingBottom: `${footerHeight + 100}px` } : {}
  }

  return (
    <>
      <Header />
        <div id="chat-container" ref={scrollableContent} className="chat-bot-container" style={getPaddingFooter()}>
          { messages.map((message, index) => getTypeMessage(message, index)) }
        </div>
      <Footer setHeight={setFooterHeight} scrollToBottom={scrollToBottom} />
    </>
  )
}
