
interface Props {
    id: number,
    title: string,
    description?: string,
    created_at: string,
    files: File[]
}

interface File {
    id: number,
    filename: string
}

const PostDetailModal: React.FC<Props> = ({ id, title, description, created_at, files }) => {

    return (
        <dialog id={`post_detail_modal_${id}`} className="modal">
            <div className="modal-box">
                <h3>{title}</h3>
                <p>{description === '' ? "No description is given" : description}</p>
                <p>Created At : {created_at}</p>
                <div className="divider"></div>
                {/* Slider */}
                <div>
                    {files.map((file, idx) => (
                        <div key={idx}>
                            {JSON.stringify(file)}
                        </div>
                    ))}
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default PostDetailModal