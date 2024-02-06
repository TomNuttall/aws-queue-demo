import Header from './components/Header'
import Footer from './components/Footer/Footer'
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
      {/* <Footer /> */}
    </>
  )
}

export default App
