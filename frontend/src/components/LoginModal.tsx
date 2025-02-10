import axios from "axios"
import { useState, FormEvent } from "react"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../reducers/authReducer"
import { AppDispatch } from "../store"
import { showToast } from "../reducers/toastReducer"

const LoginModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            username: username,
            password: password
        }).then(res => {
            dispatch(showToast({ message: "Login Success !", type: "success" }))
            dispatch(loginSuccess({ token: res.data.token, user: res.data.user }))
        }).catch(
            err => {
                console.error(err.message)
                dispatch(showToast({ message: "Invalid credentials", type: "error" }))
            }
        )
    }
    return (
        <>
            <button className="btn bg-blue-600 font-semibold mb-0.5" style={{ fontSize: "1rem" }} onClick={() => (document.getElementById('login_modal') as HTMLDialogElement)?.showModal()}>Login</button>
            <dialog id="login_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <label className="label font-bold mr-2">Username :</label>
                            <input
                                type="text"
                                className="input input-primary"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mt-2">
                            <label className="label font-bold mr-3">Password :</label>
                            <input
                                className="input input-primary"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default LoginModal