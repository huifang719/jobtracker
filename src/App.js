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
  return (
    <div className="App">
      <header className="App-header">
        <PageHeader 
          logOut={ logOut }/>
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

 