import Header from './components/Header'
import Home from './containers/Home'
import './App.css'

const App = () => {
  return (
    <>
      <Header
        title="Job Queue Demo Project"
        repo="https://github.com/TomNuttall/job-queue"
      />
      <Home />
    </>
  )
}

export default App