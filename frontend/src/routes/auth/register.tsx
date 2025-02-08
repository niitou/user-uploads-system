import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { FormEvent, useState } from 'react'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
      username : username,
      password : password
    }).then(res => {
      console.log(res.data)
      // need to redirect to login page and add message
    }).catch(
      err => console.error(err.message)
    )
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username :</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
