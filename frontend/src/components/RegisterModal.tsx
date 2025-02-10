import axios from "axios"
import { useState, FormEvent } from "react"

const RegisterModal = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const [showFailToast, setShowFailToast] = useState(false)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
            username: username,
            password: password
        }).then(res => {
            console.log(res.data)
            setShowSuccessToast(true)
            setTimeout(() => {
                setShowSuccessToast(false);
                (document.getElementById('register_modal') as HTMLDialogElement)?.close()
            }, 1000);
        }).catch(
            err => {
                console.log(err.message)
                setShowFailToast(true)
                setTimeout(() => {
                    setShowFailToast(false)
                }, 1000)
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
            {
                // Toast if register success
                showSuccessToast &&
                <div className="toast toast-end">
                    <div className="alert alert-success">
                        <span>Register success</span>
                    </div>
                </div>
            }

            {
                // Toast if register failed
                showFailToast &&
                <div className="toast toast-end">
                    <div className="alert alert-warning">
                        Registraion failed
                    </div>
                </div>
            }
        </>
    )
}

export default RegisterModal