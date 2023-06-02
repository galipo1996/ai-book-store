import { MessageArraySchema } from '@/types/types'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = await req.body()
  const parsedMessages = MessageArraySchema.parse(messages)
  const ChatGptMsg :chatGPTmsg 
}
