import axios from 'axios'
import React, { useState, type FormEvent } from 'react'

const ModalLogin: React.FC = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // console.log(import.meta.env.VITE_BACKEND_URL);
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            "username" : username,
            "password" : password
        })
        .then(
            res => console.log(res.data)
        ).catch(
            err => setError(err.message)
        )
        // reset();
    }

    const reset = () => {
        setUsername("");
        setPassword("");
        (document.getElementById('login') as HTMLDialogElement | null)?.close();
    }
    return (
        <>
            <button className='btn bg-blue-500' onClick={() => (document.getElementById('login') as HTMLDialogElement | null)?.showModal()}>Login</button>
            <dialog id='login' className='modal'>
                <div className="modal-box">
                    <h3 className='font-bold text-lg'>Login</h3>
                    <form onSubmit={handleSubmit} className='mt-6 space-y-6'>
                        <div>
                            <label className='block text-sm font-bold text-black dark:text-white'>Username : </label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' />
                        </div>

                        <div>
                            <label className='block text-sm font-bold text-black dark:text-white'>Password : </label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500' />
                        </div>
                        <button type="submit" className="w-full text-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150">
                            Login
                        </button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default ModalLogin