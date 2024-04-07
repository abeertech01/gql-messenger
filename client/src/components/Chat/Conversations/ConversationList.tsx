import { Session } from "next-auth"
import React, { useState } from "react"
import ConversationModal from "./Modal/ConversationModal"

type ConversationListProps = {
  session: Session
}

const ConversationList: React.FC<ConversationListProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  return (
    <div>
      <button onClick={onOpen}>Find or start a conversation</button>
      <ConversationModal session={session} isOpen={isOpen} onClose={onClose} />
    </div>
  )
}
export default ConversationList
