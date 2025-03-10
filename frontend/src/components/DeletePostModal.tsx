import axios from "axios"
import { FormEvent } from "react"
import { AppDispatch } from "../store"
import { useDispatch } from "react-redux"
import { showToast } from "../reducers/toastReducer"
import { useRouter } from "@tanstack/react-router"

const DeletePostModal: React.FC<{ id: number }> = ({ id }) => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const handleDelete = (e: FormEvent) => {
        e.preventDefault()
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/post/${id}`)
            .then(() => { 
                dispatch(showToast({ message: "Post is deleted", type: "success" }))
                router.invalidate() // re-fetch data
             })
            .catch(err => { dispatch(showToast({ message: err.message, type: "error" })) })
    }

    const cancelDelete = () => {
        (document.getElementById(`delete_post_modal_${id}`) as HTMLDialogElement)?.close()
    }
    return (
        <>
            <button className="btn bg-red-400 font-semibold mt-0.5" style={{ fontSize: "1em" }} onClick={() => (document.getElementById(`delete_post_modal_${id}`) as HTMLDialogElement)?.showModal()}>Delete</button>
            <dialog id={`delete_post_modal_${id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Confirm Delete Post?</h3>
                    <p>This action is not reversible</p>
                    <form onSubmit={handleDelete}>
                        <div className="mt-2 flex justify-between">
                            <button type='submit' className="btn btn-success">Yes</button>
                            <button type='button' onClick={cancelDelete} className="btn btn-error">No</button>
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

export default DeletePostModal