'use client'
import React, { HTMLAttributes, useContext } from 'react'
import { MessageContext } from './context/Messages'
import { cn } from '@/lib/utils'
import MarkdownLite from './MarkdownLite'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages = ({ className, ...props }: ChatMessagesProps) => {
  const { messages } = useContext(MessageContext)
  const inverseMSG = [...messages].reverse()
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-rounded scrollbar-truck-blue-lighter scrollbar-w-2 scrollbar-thumb-blue scrolling-touch',
        className
      )}
      {...props}
    >
      <div className='flex-1 flex-grow' />
      {inverseMSG.map((message) => (
        <div key={message.id} className='chat-message'>
          <div
            className={cn('flex items-end', {
              'justify-end': message.fromUser,
            })}
          >
            <div
              className={cn(
                'flex flex-col space-y-2 text-sm max-w-xs mx-2 overflow-x-hidden',
                {
                  'order-1 items-end': message.fromUser,
                  'order-2 items-start': !message.fromUser,
                }
              )}
            >
              <p
                className={cn('px-4 py-2 rounded-lg', {
                  'bg-blue-600 text-white': message.fromUser,
                  'bg-gray-200 text-gray-900': !message.fromUser,
                })}
              >
          
                <MarkdownLite text={message.text} />
              </p>
            </div>
          </div>
        </div>
      ))}
      ChatMessages
    </div>
  )
}

export default ChatMessages
