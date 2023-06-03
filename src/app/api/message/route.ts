import { GPTResponse } from '@/helpers/chatbot-prompt';
import { OpenAIStream, OpenAIpayload, chatGPTmsg } from '@/lib/streamAI'
import { MessageArraySchema } from '@/types/types'

export async function POST( req:Request ) {
  const { messages } = await req.json()
  const parsedMessages = MessageArraySchema.parse(messages)
  const ChatGptMsg: chatGPTmsg[] = parsedMessages.map((message) => ({
    role: message.fromUser ? 'user' : 'system',
    content: message.text,
  }))
  ChatGptMsg.unshift({ role: 'system', content: GPTResponse })
  const payload: OpenAIpayload = {
    model: 'gpt-3.5-turbo',
    messages: ChatGptMsg,
    temperature: 0.8,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  }
  const stream = await OpenAIStream(payload)

  return new Response(stream)
}


