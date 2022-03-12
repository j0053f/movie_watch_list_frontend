import React, { useEffect, useState } from 'react'

export default function SignUp () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    isSubmitted &&
      fetch('/api/movielist/v1.1/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: username,
          password: password,
          email: email
        })
      })
  }, [isSubmitted])

  function handleChange (event) {
    const target = event.target
    target.name === 'email' && setEmail(target.value)
    target.name === 'username' && setUsername(target.value)
    target.name === 'password' && setPassword(target.value)
  }

  function handleSubmit (event) {
    event.preventDefault()
    setIsSubmitted(true)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          ></input>
        </label>

        <label>
          email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          ></input>
        </label>

        <label>
          password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          ></input>
        </label>

        <input type="submit" value="submit" />
      </form>
    </div>
  )
}
