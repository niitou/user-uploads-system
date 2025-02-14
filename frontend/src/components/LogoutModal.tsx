import { FormEvent } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../reducers/authReducer"
import { AppDispatch } from "../store"
// import { redirect } from "@tanstack/react-router"
import { showToast } from "../reducers/toastReducer"
import { useRouter } from "@tanstack/react-router"

const LogoutModal = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(showToast({message : "Log out success !", type : "success"}))
        dispatch(logout())
        router.navigate({
            to : "/"
        })
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
            </dialog>
        </>
    )
}

export default LogoutModal