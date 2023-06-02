import React from 'react'

interface ChatNameProps {}

const ChatName = ({}: ChatNameProps) => {
  return (
    <div className='w-full flex gap-3 justify-start items-center text-zinc-800'>
      <div className='flex flex-col text-sm items-start'>
        <p className='text-xs'>Chat With</p>
        <div className='flex gap-1.5 items-center'>
          <p className='w-4 h-4 rounded-full bg-green-500 ' />
          <p className='text-lg font-medium'>BookBuddy Support</p>
        </div>
      </div>
    </div>
  )
}

export default ChatName
