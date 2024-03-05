import React from 'react'

import { auth, signOut } from 'shortiny/server/auth'

export default async function Settings() {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form action={async ()=> {
        "use server"
        await signOut()
      }}>

        <button type="submit">
          Sign out
        </button>
      </form>
    </div>
  )
}
