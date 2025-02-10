import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../reducers/authReducer"
import { AppDispatch } from "../store"

const LogoutModal = () => {
    const [showSuccessToast, setShowSuccessToast] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setShowSuccessToast(true)
        setTimeout(() => {
            setShowSuccessToast(false);
            dispatch(logout())
        }, 1000)
    }

    const cancelSubmit = () => {
        (document.getElementById('logout_modal') as HTMLDialogElement)?.close()
    }
    return (
        <>
            <hr />
            <button className="btn bg-red-400 font-semibold mt-0.5" style={{ fontSize: "1em" }} onClick={() => (document.getElementById('logout_modal') as HTMLDialogElement)?.showModal()}>Logout</button>
            <dialog id="logout_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Confirm Logout ?</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2 flex justify-between">
                            <button type='submit' className="btn btn-success">Yes</button>
                            <button onClick={cancelSubmit} className="btn btn-error">No</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                {
                    showSuccessToast &&
                    <div className="toast toast-end">
                        <div className="alert alert-success">
                            <span>Log Out Success</span>
                        </div>
                    </div>
                }
            </dialog>
        </>
    )
}

export default LogoutModal