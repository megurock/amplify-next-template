'use client'

import outputs from '@/amplify_outputs.json'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'

Amplify.configure(outputs)

export function AmplifyAuthProvider({ children }: { children: React.ReactNode }) {
  return <Authenticator>{children}</Authenticator>
}
