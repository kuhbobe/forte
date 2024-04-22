import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home'
import Login from './components/auth'
import DashboardPage from './components/dashboard' // Import dashboardPage component
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* Add route for dashboardPage */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
