import React, { useState, useEffect } from 'react';
import './App.css';
import PageHeader from './components/inc/PageHeader';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/home';
import JobBoard from './components/JobBoard';
import { Routes, Route, useNavigate } from 'react-router-dom';


const App = () => {
  const [loggedInEmail, setloggedInEmail] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [jobsList, setJobsList] = useState([])
  const navigate = useNavigate()
  
  const logIn = event => {
    event.preventDefault()
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
    console.log(title)
    console.log(location)
    if (loggedInEmail === null) {
      navigate('/login')
      setErrorMessage('Please login first')
    } else {
      fetch('/api/search')
      .then(res => res.json())
      .then(res => {
        const app_key = res
        return fetch(`https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=6fe66bca&app_key=${app_key}&title_only=${title}&where=${location}`)
    })
    .then(res => res.json())
    .then(res => {
      const jobsInfo = res.results
        .map(job => {
            const jobInfo = {}
            jobInfo.title = job['title'] 
            jobInfo.description = job['description']
            jobInfo.location = job['location']['display_name']
            jobInfo.url = job['redirect_url']
            return jobInfo
          })
      setJobsList(jobsInfo)
      navigate('/jobboard')
    })
  }
}

  return (
    <div className="App">
      <header className="App-header me-0">
        <PageHeader 
          logOut = { logOut }
          searchForJob = { searchForJob }
        />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home 
            loggedInEmail = {loggedInEmail} />} 
          />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn 
            loggedInEmail= {loggedInEmail}
            logIn = {logIn}
            errorMessage = { errorMessage }/>} 
          />
          <Route path='/jobboard' element={<JobBoard 
            loggedInEmail = { loggedInEmail }
            jobsList = { jobsList }
            />}  
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;