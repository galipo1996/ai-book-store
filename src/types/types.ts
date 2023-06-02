import {z} from "zod"
const MessageSchema = z.object({id:z.string(),fromUser:z.boolean(),text:z.string()})
export const MessageArraySchema = z.array(MessageSchema)

export type Message = z.infer<typeof MessageSchema>
export type MessageArray = z.infer<typeof MessageArraySchema>