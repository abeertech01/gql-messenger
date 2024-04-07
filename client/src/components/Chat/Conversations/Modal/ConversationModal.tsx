import React, { useState } from "react"
import { Session } from "next-auth"

type ConversationModalProps = {
  session: Session
  isOpen: boolean
  onClose: () => void
}

const ConversationModal: React.FC<ConversationModalProps> = ({
  session,
  isOpen,
  onClose,
}) => {
  const [username, setUsername] = useState("")

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    // searchUsers({ variables: { username } });
    console.log(username)
  }

  return (
    <>
      {isOpen && (
        <div>
          <button onClick={onClose}>❌</button>
          <h1>Create a Conversation</h1>
          <div>
            <form onSubmit={onSearch}>
              <input
                type="text"
                placeholder="Enter a username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default ConversationModal
