import { Session } from "next-auth"
import React from "react"
import ConversationList from "./ConversationList"

type ConversationWrapperProps = {
  session: Session
}

const ConversationWrapper: React.FC<ConversationWrapperProps> = ({
  session,
}) => {
  return (
    <div>
      <ConversationList session={session} />
    </div>
  )
}
export default ConversationWrapper
