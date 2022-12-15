import './App.css';
import PageHeader from './components/inc/PageHeader';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/home';
import JobBoard from './components/JobBoard';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from './supabaseClient';
import { AiFillDatabase } from 'react-icons/ai';


const App = () => {
  const [loggedInEmail, setloggedInEmail] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [jobsList, setJobsList] = useState([])
  const navigate = useNavigate()
  
  const handleLogIn = async(e) => {
    e.preventDefault()
    const form = e.target
    const userData = Object.fromEntries(new FormData(form))

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    })
    if (error) {
      console.log(error)
      alert("Something went wrong,please try again")
    } else {
      setloggedInEmail(data.user.email) 
      navigate('/') 
    }
    
  }

  const handleGoogleAuth =async(e)=> {
    e.preventDefault()
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
    
    if (data) {
      setloggedInEmail(data.user.email) 
    }
  }
 
  // const fetchSession = async() => {
  //   const {data, error} = await supabase.auth.getSession()
  //     if (data) {
  //       console.log(data)
  //       setloggedInEmail(data.user.email)
  //     } 
  //   }

  
  useEffect(() => {
    async function fetchSession() {
      const {data, error} = await supabase.auth.getSession()
      if (data) {
        setloggedInEmail(data.user.email)
      } 
    }
  }, [loggedInEmail])

  const logOut = async() => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } {
      console.log('successfully logged out')
      setloggedInEmail(null)
    }
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
      const app_key = process.env.REACT_APP_adzuna_api_key
      return fetch(`https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=6fe66bca&app_key=${app_key}&title_only=${title}&where=${location}`)
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
            handleLogIn = {handleLogIn}
            handleGoogleAuth = {handleGoogleAuth}
            />} 
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