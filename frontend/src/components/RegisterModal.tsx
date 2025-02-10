import axios from "axios"
import { useState, FormEvent } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { showToast } from "../reducers/toastReducer"

const RegisterModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
            username: username,
            password: password
        }).then(res => {
            console.log(res.data);
            dispatch(showToast({message : "Register success !", type : "info"}));
            (document.getElementById('register_modal') as HTMLDialogElement)?.close()
        }).catch(
            err => {
                console.log(err.message)
                dispatch(showToast({message : "Register failed !", type : "warning"}))
            }
        )
    }
    return (
        <>
            <button className="btn bg-green-500 font-semibold mb-0.5" style={{ fontSize: "1em" }} onClick={() => (document.getElementById('register_modal') as HTMLDialogElement)?.showModal()}>Register</button>
            <dialog id="register_modal" className="modal">
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
                            <button type="submit" className="btn btn-primary">Register</button>
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

export default RegisterModal