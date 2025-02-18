import axios from "axios"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { updateUser } from "../reducers/authReducer"
import { showToast } from "../reducers/toastReducer"

interface Props {
    username: string,
    avatar: string,
    profile_id: number
}

const UpdateUserModal: React.FC<Props> = ({ avatar, profile_id, username }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [newUsername, setNewUsername] = useState(username)
    const [newAvatar, setNewAvatar] = useState<File>()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewAvatar(e.target.files[0])
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("username", newUsername)
        if (newAvatar) {
            formData.append("avatar", newAvatar)
        }
        axios.patch(`${import.meta.env.VITE_BACKEND_URL}/profile/${profile_id}`, formData)
            .then(res => {
                console.log(res.data)
                dispatch(updateUser({ //dispatch data on update
                    username: res.data.username,
                    avatar: res.data.avatar 
                }))
                dispatch(showToast({message: "Profile updated !", type : "success"}));
                (document.getElementById('edit_profile_modal') as HTMLDialogElement).close()
            })
            .catch(err => {
                console.error(err)
                dispatch(showToast({message: err.response.data.message, type:"error"}))
            })

        console.log(newAvatar, profile_id, newUsername)
    }
    return (
        <>
            <button className="btn btn-primary" onClick={() => (document.getElementById('edit_profile_modal') as HTMLDialogElement)?.showModal()}>Edit Profile</button>
            <dialog id="edit_profile_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Profile</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset w-max">
                            <legend className="fieldset-legend">Username : </legend>
                            <input type="text" className="input input-primary" value={newUsername} onChange={e => setNewUsername(e.target.value)} />

                            <figure>
                                <img src={avatar === "" ? "/assets/default.jpg" : `${import.meta.env.VITE_BACKEND_URL}/media/${avatar}`} className="object-cover w-30" />
                            </figure>
                            <legend className="fieldset-legend">Avatar : </legend>
                            <input type="file" className="file-input" onChange={handleFileChange} />
                            <label className="fieldset-label">png, jpg, jpeg (Max 10MB)</label>
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

export default UpdateUserModal