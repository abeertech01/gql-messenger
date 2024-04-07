import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types"
import { useMutation } from "@apollo/client"
import { Session } from "next-auth"
import { signIn } from "next-auth/react"
import React, { useState } from "react"
import UserOperations from "@/graphql/operations/user"

type AuthProps = {
  session: Session | null
  reloadSession: () => void
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("")

  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername)

  const onSubmit = async () => {
    if (!username) return
    console.log(username)

    try {
      const { data } = await createUsername({ variables: { username } })

      if (!data?.createUsername) {
        throw new Error()
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data

        throw new Error(error)
      }

      /**
       * Reload session to obtain new username
       */
      reloadSession()
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div>
      {session ? (
        <>
          <h1 className="text-3xl">Create a Username</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
          />
          <button onClick={onSubmit} className="border">
            Save
          </button>
        </>
      ) : (
        <>
          <h1>GQL Messenger</h1>
          <button onClick={() => signIn("google")} className="border">
            Continue with google
          </button>
        </>
      )}
    </div>
  )
}
export default Auth
