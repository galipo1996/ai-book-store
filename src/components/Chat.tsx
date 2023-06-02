import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import ChatName from './ChatName'
import ChatInput from './ChatInput'

interface ChatProps {
  
}

const Chat = ({}: ChatProps) => {
  return (
    <Accordion className=' relative bg-white shadow z-10' type='single' collapsible>
      <AccordionItem value='item-1'>
        <div className='right-8 bottom-8 fixed bg-white w-80 border-gray-200 rounded-md overflow-hidden'>
          <div className='w-full h-full flex flex-col'>
            <AccordionTrigger className='px-6 border-b border-zinc-300'>
              <ChatName/>
            </AccordionTrigger>
            <AccordionContent>
              <ChatInput/>
            </AccordionContent>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  )

}

export default Chat
