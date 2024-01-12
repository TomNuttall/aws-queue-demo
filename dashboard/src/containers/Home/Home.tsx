import { Account } from '../../lib/Account'
import Login from '../../components/Login'
import Signup from '../../components/Signup'
import StartJob from '../../components/StartJob'

const Home = () => {
  return (
    <Account>
      <Signup />
      <Login />
      <StartJob />
    </Account>
  )
}

export default Home
