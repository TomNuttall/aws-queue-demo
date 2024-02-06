import { useState } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { AuthContext } from '../../lib/AuthContext'
import UserPool from '../../lib/UserPool'
import Login from '../../components/Login'

type AuthWrapperProps = {
  children: JSX.Element | JSX.Element[]
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const [signedIn, setSignedIn] = useState<boolean>(false)
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser()
      if (user) {
        user.getSession((err: any, session: any) => {
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
    return await new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (data: any) => {
          setSignedIn(true)
          resolve(data)
        },
        onFailure: (data: any) => {
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
