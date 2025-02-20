import { Link } from "@tanstack/react-router"

interface Props {
    title: string,
    description?: string,
    userId?: number,
    profileId?: number
    profileUsername?: string

}

const PostCardComponent: React.FC<Props> = ({ title, description, userId, profileId, profileUsername }) => {
    return (
        <div className="card bg-accent-content text-primary-content w-72">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description ?? <i>No description given</i>}</p>
                <div className="card-actions justify-end">
                    {userId && profileId && profileUsername ?
                        <Link to={'/profile/$profileId'} params={{ profileId: profileId.toString() }}>{profileUsername}</Link>
                        : <Link disabled={true} to={"."}>Anonymous</Link>}
                </div>
            </div>
        </div>
    )
}

export default PostCardComponent