import './App.css';
import PageHeader from './components/inc/PageHeader';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/home';
import { Routes, Route } from 'react-router-dom';


function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <PageHeader />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

 