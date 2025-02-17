import axios from 'axios'
import { FormEvent, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { showToast } from '../reducers/toastReducer'

interface Props {
    user_id: number
}

const AddPostModal: React.FC<Props> = ({ user_id }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files)) // Convert FileList to File[]
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("user_id", user_id.toString())
        files.forEach((file) => {
            formData.append("files", file)
        })
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/post`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(
            res => {
                if (res.status === 201) {
                    dispatch(showToast({ message: "Post Succesfully Added", type: "success" }))
                    // Set Inputs to empty on submit
                    setTitle("")
                    setDescription("")
                    setFiles([])
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "" // Reset file input
                    }
                    (document.getElementById('new_post_modal') as HTMLDialogElement)?.close()
                }
            }
        ).catch(
            err => {
                dispatch(showToast({message: err.response.data.message, type:"error"}))
                console.error(err.message)
            }
        )
    }
    return (
        <>
            <button className="btn btn-accent" onClick={() => (document.getElementById('new_post_modal') as HTMLDialogElement)?.showModal()}>New Post</button>
            <dialog id="new_post_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Post</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className='fieldset w-max'>
                            <legend className="fieldset-legend">Title :</legend>
                            <input
                                required={true}
                                type="text"
                                className="input input-primary"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <legend className="fieldset-legend">Description :</legend>
                            <textarea className='textarea textarea-primary'
                                value={description}
                                cols={30}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <legend className="fieldset-legend">Files :</legend>
                            <input type="file" className='file-input' multiple={true} ref={fileInputRef} onChange={handleFileChange} />
                            <label className="fieldset-label">png, jpg, jpeg, mp4, mov (Max 50MB)</label>

                            <div className="mt-2">
                                <button type="submit" className="btn btn-primary">Post</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default AddPostModal