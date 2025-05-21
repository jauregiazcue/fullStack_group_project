import MatchHistory from './components/matchHistory/matchHistory'
import QuestionComponent from './components/questionComponent/QuestionComponent';
import './App.css'
import "@fontsource/fredoka";
import "@fontsource/baloo-2";
import Register from './pages/auth/Register'

function App() {

  return (
    <>
    <!-- This is just testing stuff and can safely be ignored-->
      <QuestionComponent />
      <MatchHistory />
      <Register />
    </>
  )
}

export default App
