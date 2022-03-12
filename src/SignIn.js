/* eslint-disable react/jsx-filename-extension */
import React, { useContext, useEffect, useState } from 'react'
import { credentialsContext } from './App'
import Home from './Home'
export default function SignIn () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { credentials, setCredentials } = useContext(credentialsContext)

  console.log(isAuthenticated)
  console.log(username)

  function handleChange (event) {
    const { target } = event

    if (target.name === 'username') setUsername(target.value)
    if (target.name === 'password') setPassword(target.value)
  }
  function handleSubmit (event) {
    event.preventDefault()
    setIsSubmitted(true)
  }
  useEffect(
    () => {
      if (isSubmitted) {
        fetch('/api/movielist/v1.1/signin', {
          headers: {
            Authorization: `Basic ${window.btoa(`${username}:${password}`)}`
          }
        })
          .then((response) => response.json())
          .then(({ name, actual_status_code }) => {
            console.log(name, actual_status_code)
            if (name) {
              setIsAuthenticated(true)
              console.log(name)
              setCredentials({ username: username, password: password })
            } else {
              setIsSubmitted(false)
            }
          })
      }
    },
    [isSubmitted]
  )

  if (credentials.username) {
    return (
<Home/>
    )
  } else {
    console.log('context username ', credentials.username)
    return (
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>

        <label>
          password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    )
  }
}
