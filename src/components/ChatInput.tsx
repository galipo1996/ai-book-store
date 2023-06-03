'use client'
import { cn } from '@/lib/utils'
import { toast } from 'react-hot-toast'
import React, { HTMLAttributes, useContext, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { nanoid } from 'nanoid'
import { useMutation } from '@tanstack/react-query'
import { Message } from '@/types/types'
import { MessageContext } from './context/Messages'
import { CornerDownLeft, Loader2 } from 'lucide-react'
interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {}

const ChatInput = ({ className, ...props }: ChatInputProps) => {
  const textArea = useRef<null | HTMLTextAreaElement>(null)
  const [Input, SetInput] = useState<string>('')
  const {
    addMsg,
    removeMsg,
    updateMsg,
    setIsMsgUpdating,
    isMsgUpdating,
    messages,
  } = useContext(MessageContext)
  const { mutate: sendMessage, isLoading } = useMutation({
    mutationFn: async (message: Message) => {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [message] }),
      })
      console.log(response.body)
      return response.body
    },
    onMutate(message) {
      addMsg(message)
    },
    onSuccess: async (stream) => {
      if (!stream) {
        throw new Error('no stream found')
      }
      setIsMsgUpdating(true)
      const id = nanoid()
      const mutateMSG: Message = {
        id,
        fromUser: false,
        text: '',
      }
      addMsg(mutateMSG)
      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        updateMsg(id, (prev) => prev + chunkValue)
        console.log(chunkValue)
      }
      setIsMsgUpdating(false)
      SetInput('')
      textArea.current?.focus()
    },
    onError: (_, message) => {
      toast.error('Something went wrong. Please try again.')
      removeMsg(message.id)
      textArea.current?.focus()
    },
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
        disabled={isLoading}
          ref={textArea}
          rows={2}
          onChange={(e) => SetInput(e.target.value)}
          maxRows={4}
          value={Input}
          onKeyDown={handlerEnter}
          autoFocus
          className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6'
          placeholder='write your message...'
        />
        
        <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
          <kbd className='inline-flex items-center rounded border bg-white border-gray-200 px-1 font-sans text-xs text-gray-400'>
            {isLoading ? (
              <Loader2 className='w-3 h-3 animate-spin' />
            ) : (
              <CornerDownLeft className='w-3 h-3' />
            )}
          </kbd>
        </div>

        <div
          className='absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600'
          aria-hidden='true'
        />
      </div>
   

    </div>
  )
}

export default ChatInput
