"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import MessagesProvider from './context/Messages'

interface ProviderProps {
  children:ReactNode
}

const Provider = ({ children }: ProviderProps) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  )
}

export default Provider
