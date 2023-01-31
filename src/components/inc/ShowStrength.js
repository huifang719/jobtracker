import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ShowStrength = ({ password }) => { 
  let passwordStrength = {
      score: 0,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false, 
      hasNonAlphaNumeric: false, 
      isOver8Char: false,
      isOver12Char: false
    }
    
  if (password === null) {
   console.log("Enter Password")
  }
  if (/[a-z]+/.test(password)) {
    passwordStrength.score = passwordStrength.score + 1
    passwordStrength.hasLowerCase = true
  } 
  if (/[A-Z]+/.test(password)) {
    passwordStrength.score = passwordStrength.score + 1
    passwordStrength.hasUpperCase = true
  }
  if (/[0-9]+/.test(password)) {
    passwordStrength.score = passwordStrength.score + 1
    passwordStrength.hasNumber = true
  }
  if (/[!@#&()–[{}\]\\:;',?/*`~$^+=<>"]+/.test(password)) {
    passwordStrength.score = passwordStrength.score + 1
    passwordStrength.hasNonAlphaNumeric = true
  }
  if (/(.){12,}/.test(password)) {
    passwordStrength.score = passwordStrength.score + 1
    passwordStrength.isOver12Char = true
  }
  if (/(.){8,12}/.test(password)) {
    passwordStrength.score = passwordStrength.score + 1
    passwordStrength.isOver8Char = true
  }
  
  const now = passwordStrength.score/6*100
  let msg = null
  let color = null
  if (now < 33.34) {
    msg = "Weak"
    color = "danger"
  } else if (now < 66.67 ) {
    msg = "medium"
    color = "warning"
  } else {
    msg = "Strong"
    color = "success"
  }

  return (
    <div className='col-5 mt-2' style={password? {} : {display:"none"}}>
      <ProgressBar variant={color} now={now} label={`${msg}`} />
    </div> 
  )
}

export default ShowStrength