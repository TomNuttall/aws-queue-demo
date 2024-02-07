import Header from './components/Header'
import AuthWrapper from './context/AuthWrapper'
import Home from './containers/Home'

const App = () => {
  return (
    <>
      <Header
        title="Job Queue Demo Project"
        repo="https://github.com/TomNuttall/job-queue"
      />
      <AuthWrapper>
        <Home />
      </AuthWrapper>
    </>
  )
}

export default App
