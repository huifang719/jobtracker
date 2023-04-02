/* eslint-disable react-hooks/exhaustive-deps */
import PageHeader from './components/inc/PageHeader'
import './App.css'
import { FieldValues } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listingJob, reset } from './features/jobSlice';
import JobBoard from './components/JobBoard';
import Home from './components/Home';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { removeUser, setUser } from './features/userSlice';
import { setSavedJob } from './features/savedJobList';

const App:React.FC = () => {
  const loggedInEmail = useSelector((state: any) => state.user.value.email)
  const [errorMessage, setErrorMessage] = useState<string|null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logIn = async(data:FieldValues) => {
    await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }) 
      .then(res => res.json())
      .then(res => {
        if (typeof res === 'string') {
          dispatch(setUser({email: res}))
          setErrorMessage(null)
          navigate('/')         
        } else {
          setErrorMessage(res.error)
        }
        }
      )  
  }
  
  const getSavedJobList = ()  => {
    if (loggedInEmail) {
      fetch(`/api/save/${loggedInEmail}`)
      .then(res => res.json())
      .then(jobs => { 
        dispatch(setSavedJob(jobs))
        console.log(jobs)
     })  
    } else {
      setSavedJob([])
      console.log('no user logged in')
    }   
  } 
  useEffect(() => {
    getSavedJobList();
    checkSession()
  }, [loggedInEmail]);

  const checkSession = () => {
    fetch('/api/sessions')
    .then(res => res.json())
    .then(email => {
    if (typeof email === 'string') {
      dispatch(setUser({email: email}))
    } else {
      console.log("no user logged in")
    }
  })
  }

  const logOut = async() => {
    await fetch('/api/sessions', {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      dispatch(removeUser({email: null}))
  })
  }
  const handleSearch = async(data: FieldValues) => {
    if (loggedInEmail === null) {
      navigate('/login')
      setErrorMessage('Please login first')
      return
    }
    dispatch(reset())
    const api_key  = await fetch('/api/search')
      .then(res => res.json())

    const { title, location} = data
    const response= await fetch(`https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=6fe66bca&app_key=${api_key}&title_only=${title}&where=${location}`)
      .then(res => res.json())
    await console.log(response)
    const searchResult = await response.results.map((job: any) => {
      const { title, location, description, redirect_url
      } = job 
      dispatch(listingJob({title: title, location: location, description: description, url: redirect_url}))
      return {title, location, description, redirect_url}
    }) 
    await navigate('/jobboard')
  }
  
  return (
    <div className="App">
      <header className="App-header me-0">
        <PageHeader 
          logOut = { logOut }
          handleSearch={handleSearch}
        />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} 
          />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn 
            logIn = {logIn}
            errorMessage = { errorMessage }/>} 
          />
          <Route path='/jobboard' element={<JobBoard  />}  
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
