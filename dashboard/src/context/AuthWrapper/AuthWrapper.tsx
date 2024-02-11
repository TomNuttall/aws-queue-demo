import { useState } from 'react'
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'
import { AuthContext } from '../../lib/AuthContext'
import UserPool from '../../lib/UserPool'
import Login from '../../components/Login'

type AuthWrapperProps = {
  children: JSX.Element | JSX.Element[]
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false)
  const getSession = async () => {
    return await new Promise<CognitoUserSession | null>((resolve, reject) => {
      const user = UserPool.getCurrentUser()
      if (user) {
        user.getSession((err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject()
          } else {
            resolve(session)
          }
        })
      } else {
        reject()
      }
    })
  }
  const authenticate = async (Username: string, Password: string) => {
    const user = new CognitoUser({ Username, Pool: UserPool })
    const authDetails = new AuthenticationDetails({
      Username,
      Password,
    })
    return await new Promise<void>((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: () => {
          setSignedIn(true)
          resolve()
        },
        onFailure: (data: Error) => {
          reject(data)
        },
      })
    })
  }
  const logout = () => {
    const user = UserPool.getCurrentUser()
    if (user) {
      user.signOut()
      setSignedIn(false)
    }
  }
  return (
    <AuthContext.Provider value={{ authenticate, getSession, logout }}>
      {signedIn ? children : <Login />}
    </AuthContext.Provider>
  )
}

export default AuthWrapper
