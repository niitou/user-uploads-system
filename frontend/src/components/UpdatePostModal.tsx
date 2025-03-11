import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { useRouter } from "@tanstack/react-router"
import { FormEvent, useState } from "react"
import axios from "axios"
import { showToast } from "../reducers/toastReducer"

const UpdatePostModal: React.FC<{ id: number, title: string, description: string | undefined }> = ({ id, title, description }) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState<string | undefined>(description)


  const handleUpdate = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", newTitle)
    formData.append("description", newDescription || "null")
    axios.patch(`${import.meta.env.VITE_BACKEND_URL}/post/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        router.invalidate()
        dispatch(showToast({message: "Post updated !", type : "success"}));
        (document.getElementById(`edit_post_modal_${id}`) as HTMLDialogElement).close()
      }).catch(err => {
        console.error(err)
        dispatch(showToast({message: err.response.data.message, type: "error"}))
      })
  }
  return (
    <>
      <button className="btn btn-primary" onClick={() => (document.getElementById(`edit_post_modal_${id}`) as HTMLDialogElement)?.showModal()}>Edit Post</button>
      <dialog id={`edit_post_modal_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Post</h3>
          <form onSubmit={handleUpdate}>
            <fieldset className="fieldset w-max">
              <legend className="fieldset-legend">Title : </legend>
              <input type="text" className="input input-primary" value={newTitle} onChange={e => setNewTitle(e.target.value)} />

              <legend className="fieldset-legend">Description : </legend>
              <input type="text" className="input input-primary" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
            </fieldset>
            <div className="mt-2">
              <button type="submit" className="btn btn-primary">Update</button>
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

export default UpdatePostModal