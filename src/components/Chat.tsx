import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import ChatName from './ChatName'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'

interface ChatProps {}

const Chat = ({}: ChatProps) => {
  return (
    <Accordion
      className=' relative bg-white shadow z-10'
      type='single'
      collapsible
    >
      <AccordionItem value='item-1'>
        <div className='fixed right-8 w-80 bottom-8 bg-white border border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col'>
            <AccordionTrigger className='px-6 border-b border-zinc-300'>
              <ChatName />
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-col h-80'>
                <ChatMessages className='px-2 py-3 flex-1'/>
                <ChatInput className='px-4' />
              </div>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )
}

export default Chat
