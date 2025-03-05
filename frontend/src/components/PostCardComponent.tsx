import { Link, useLocation } from "@tanstack/react-router"
import PostDetailModal from "./PostDetailModal"

interface Props {
    id: number,
    title: string,
    description?: string,
    userId?: number,
    profileId?: number
    profileUsername?: string
    created_at: string
    files: File[]
}

interface File {
    id: number,
    filename: string
}

const PostCardComponent: React.FC<Props> = ({ id, title, description, userId, profileId, profileUsername, created_at, files }) => {
    const location = useLocation()
    return (
        <>
            <div className="card bg-base-300 outline-1 outline-gray-100 text-primary-content w-72 md:w-48 lg:w-64">
                {/* add on click and open modal */}
                <div className="card-body">
                    <div className="" onClick={() => (document.getElementById(`post_detail_modal_${id}`) as HTMLDialogElement)?.showModal()} style={{ cursor: "pointer" }}>
                        <h2 className="card-title">{title}</h2>
                        <p>{description === '' ? <i>No description given</i> : description}</p>
                    </div>
                    {
                        location.pathname.split("/")[1] === "profile" ? <></> : location.pathname === "/dashboard" ?
                            <div className="card-actions justify-end">
                                <button className="btn btn-success text-sm">Edit</button>
                                <button className="btn btn-error text-sm">Delete</button>
                            </div> : 
                            <>
                                <div className="divider"></div><div className="card-actions justify-end">
                                    {userId && profileId && profileUsername ?
                                        <Link to={'/profile/$profileId'} params={{ profileId: userId.toString() }}>{profileUsername}</Link>
                                        : <Link disabled={true} to={"."}>Anonymous</Link>}
                                </div>
                            </>
                    }
                </div>
            </div>
            <PostDetailModal id={id} title={title} description={description} created_at={created_at} files={files} />
        </>
    )
}

export default PostCardComponent