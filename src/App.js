import './App.css';
import PageHeader from './components/inc/PageHeader';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/home';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const [loggedInEmail, setloggedInEmail] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  
  const logIn = event => {
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }) 
      .then(res => res.json())
      .then(res => {
        if (typeof res === 'string') {
          setloggedInEmail(res)
          navigate('/')
        } else {
          setErrorMessage(res.error)
        }
        }
      )  
  }
  const checkSession = () => {
    fetch('/api/sessions')
    .then(res => res.json())
    .then(email => {
    if (typeof email === 'string') {
      setloggedInEmail(email)
    } else {
      console.log("no user logged in")
    }
  })
  }
  useEffect(checkSession, [loggedInEmail])
  const logOut = () => {
    fetch('/api/sessions', {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
    setloggedInEmail(null)
  })
  }

  const searchForJob = event => {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))
    const title = data.title
    const location = data.location
    if (loggedInEmail === null) {
      navigate('/login')
      setErrorMessage('Please login first')
    } else {
      fetch('/api/search')
      .then(res => res.json())
      .then(res => {
        return fetch(`https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=6fe66bca&app_key=${app_key}&results_per_page=10&title_only=${title}&where=${location}`)
    })
    .then(res => res.json())
    .then(res => console.log(res))
  }
}
  
  return (
    <div className="App">
      <header className="App-header">
        <PageHeader 
          logOut = { logOut }
          searchForJob = { searchForJob }
        />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn 
            loggedInEmail= {loggedInEmail}
            logIn = {logIn}
            errorMessage = { errorMessage }/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;