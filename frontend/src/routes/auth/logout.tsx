import { createFileRoute } from '@tanstack/react-router'
import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { logout } from '../../reducers/authReducer'

export const Route = createFileRoute('/auth/logout')({
    component: RouteComponent,
})

function RouteComponent() {
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(logout())
        // redirect to homepage
    }

    const cancelSubmit = () => {
        // redirect to homepage
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Confirm Logout ?</h1>
                <div>
                    <button type='submit'>Yes</button>
                    <button onClick={cancelSubmit}>No</button>
                </div>
            </form>
        </div>
    )
}
