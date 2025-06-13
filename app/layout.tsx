import type React from 'react'
import { AmplifyAuthProvider } from './AmplifyAuthProvider'
import './app.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AmplifyAuthProvider>{children}</AmplifyAuthProvider>
      </body>
    </html>
  )
}
