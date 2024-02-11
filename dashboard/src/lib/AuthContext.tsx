import { createContext } from 'react'
import { CognitoUserSession } from 'amazon-cognito-identity-js'

export type AuthContextProps = {
  getSession: () => Promise<CognitoUserSession | null>
  authenticate: (Username: string, Password: string) => Promise<void>
  logout: () => void
}

const defaultAuthContext = {
  getSession: () => Promise.resolve(null),
  authenticate: (_: string, __: string) => Promise.resolve(),
  logout: () => {},
}

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext)
