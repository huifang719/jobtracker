import React, { useState, useEffect } from "react"
import Card from 'react-bootstrap/Card';

const Quote = () => {
  const [quote, setQuote ] = useState({})
  const getQuote = () => {
    fetch('https://type.fit/api/quotes')
    .then(res => res.json())
    .then(quotes => {
      var newQuote = quotes[Math.floor(Math.random()*quotes.length)]
      setQuote(newQuote)
    })
  } 
  useEffect(getQuote, [])

  return (
    <div className="quote mt-2 mx-auto w-9">
      <Card>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            { quote['text'] }
            
          </p>
          <footer className="blockquote-footer">
            {quote['author']}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Quote