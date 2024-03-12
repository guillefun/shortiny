import React from 'react'
import { AuthProvider } from 'shortiny/app/_components/auth/auth-provider'
import SettingsForm from 'shortiny/app/_components/auth/settings-form'

import { auth, signOut } from 'shortiny/server/auth'

export default async function Settings() {
  const session = await auth()
  console.log("session", session)
  return (
    <AuthProvider>
      <SettingsForm userData={{ username: session!.user!.name! }}/>
      {JSON.stringify(session)}
      <form action={async ()=> {
        "use server"
        await signOut()
      }}>

        <button type="submit">
          Sign out
        </button>
      </form>
    </AuthProvider>
  )
}
