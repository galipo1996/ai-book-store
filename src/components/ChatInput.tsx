'use client'
import { cn } from '@/lib/utils'
import React, { HTMLAttributes, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { nanoid } from 'nanoid'
import { useMutation } from '@tanstack/react-query'
import { Message } from '@/types/types'
interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput = ({ className, ...props }: ChatInputProps) => {
  const [Input, SetInput] = useState<string>('')

  const {
    data,
    isLoading,
    isSuccess,
    mutate: sendMessage,
  } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'heello' }),
      })
      return response.body
    },onSuccess:()=>{
     console.log('success')
    }
  })
  const handlerEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const message = {
        id: nanoid(),
        fromUser: true,
        text: Input,
      }
      sendMessage(message)
    }
  }

  return (
    <div className={cn('border-t border-zinc-300', className)} {...props}>
      <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
        <TextareaAutosize
          rows={2}
          onChange={e=>SetInput(e.target.value) }
          maxRows={4}
          value={Input}
          onKeyDown={handlerEnter}
          autoFocus
          className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
          placeholder='write your message...'
        />
      </div>
    </div>
  )
}

export default ChatInput
