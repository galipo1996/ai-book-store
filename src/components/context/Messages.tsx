"use client"
import { Message } from '@/types/types'
import { nanoid } from 'nanoid'
import React, { ReactNode, createContext, useState } from 'react'

interface MessagesProps {
  children: ReactNode
}
export const MessageContext = createContext<{
  messages: Message[]
  isMsgUpdating: boolean
  addMsg: (message: Message) => void
  removeMsg: (id: string) => void
  updateMsg: (id: string, updateFN: (prevText: string) => string) => void
  setIsMsgUpdating: (isUpdate: boolean) => void
}>({
  messages: [],
  isMsgUpdating: false,
  addMsg: () => {},
  removeMsg: () => {},
  updateMsg: () => {},
  setIsMsgUpdating: () => {},
})
const MessagesProvider = ({ children }: MessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: nanoid(), text: 'hi how can i help you', fromUser: false },
  ])
  const [isMsgUpdating, setIsMsgUpdating] = useState<boolean>(false)
  const addMsg = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }
  const removeMsg = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }
  const updateMsg = (id: string, updateFN: (prevText: string) => string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFN(message.text) }
        }
        return message
      })
    )
  }

  return (
    <MessageContext.Provider
      value={{
        addMsg,
        removeMsg,
        updateMsg,
        setIsMsgUpdating,
        isMsgUpdating,
        messages,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export default MessagesProvider
