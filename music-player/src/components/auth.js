import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth' 
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onButtonClick = async () => {
    await createUserWithEmailAndPassword(auth, email, password)


    // Simulated authentication logic
    const simulatedAuthentication = () => {
      // Simulate successful login
      const loggedIn = true;
      if (loggedIn) {
        // Redirect to the dashboard page after successful login
        navigate('/dashboard');
      } else {
        // Handle unsuccessful login
        console.error('Login failed');
      }
    }

    // Simulate authentication delay (replace with actual authentication logic)
    setTimeout(simulatedAuthentication, 1000);
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Log in</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
          type="password" // use type="password" for password input
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login
