import { FormEvent, useState } from "react"

interface Props {
    username: string,
    avatar: string,
    user_id: number
}

const UpdateUserModal: React.FC<Props> = ({ avatar, user_id, username }) => {
    const [newUsername, setNewUsername] = useState(username)
    const [newAvatar, setNewAvatar] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewAvatar(e.target.files[0])
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        console.log(newAvatar, user_id, newUsername)
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