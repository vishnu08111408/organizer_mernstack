import React, { useEffect } from 'react';
import './App.css'

function App() {
  const profile = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (profile) {
      window.location.pathname = '/home'
    }
    else {
      window.location.pathname = '/login'
    }
  })

  return (
    <div className=''>
    </div>
  )
}

export default App
