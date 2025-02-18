import axios from "axios"
import { FormEvent } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { logout } from "../reducers/authReducer"
import { showToast } from "../reducers/toastReducer"
import { useRouter } from "@tanstack/react-router"

interface Props {
  user_id: number
}
const DeleteUserModal: React.FC<Props> = ({ user_id }) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const handleDelete = (e: FormEvent) => {
    e.preventDefault()
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${user_id}`)
      .then(res => {
        console.log(res.data)
        dispatch(showToast({ message: "Account Deleted !", type: "success" }))
        dispatch(logout())

        router.navigate({
          to : "/"
      })
      }) // Dispatch message and logout
      .catch(err => console.error(err.message))
  }

  const cancelDelete = () => {
    (document.getElementById('delete_user_modal') as HTMLDialogElement)?.close()
  }
  return (
    <>
      <button className="btn bg-red-400" style={{ fontSize: "1em" }} onClick={() => (document.getElementById('delete_user_modal') as HTMLDialogElement)?.showModal()}>Delete User</button>
      <dialog id="delete_user_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Confirm Delete Account ?</h3>
          <form onSubmit={handleDelete}>
            <div className="mt-2 flex justify-between">
              <button type='submit' className="btn btn-success">Yes</button>
              <button type="button" onClick={cancelDelete} className="btn btn-error">No</button>
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

export default DeleteUserModal