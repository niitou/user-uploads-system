import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { loginSuccess } from '../../reducers/authReducer'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const dispatch = useDispatch<AppDispatch>()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
      username: username,
      password: password
    }).then(res => {
      dispatch(loginSuccess({token : res.data.token, user: res.data.user}))
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
