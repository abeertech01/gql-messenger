import { Session } from "next-auth"
import React from "react"
import ConversationWrapper from "./Conversations/ConversationWrapper"

type ChatProps = {
  session: Session
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <div>
      <ConversationWrapper session={session} />
    </div>
  )
}
export default Chat
