import { createFileRoute, ErrorComponent, useLoaderData } from '@tanstack/react-router'
import axios from 'axios'
import { Post } from '../../types/post'
import PostCardComponent from '../../components/PostCardComponent'

export const Route = createFileRoute('/profile/$profileId')({
    loader: async ({ params }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/users/${params.profileId}`,
            )
            console.log(response)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status == 404) {
                throw new Error('Profile is not exist')
            }
            throw new Error('Failed to fetch profile')
        }
    },
    component: RouteComponent,
    errorComponent: ({ error }) => <ErrorComponent error={error} />,
})

function RouteComponent() {
    // Need to get all the posts under this profile
    const data = useLoaderData({ from: "/profile/$profileId" })
    return (
        <>
            <div className="card card-side w-2xl bg-base-300 shadow-sm mx-auto my-5 border border-gray-100">
                <figure>
                    <img
                        src={data.profile.avatar ? `${import.meta.env.VITE_MEDIA_URL}/${data.profile.avatar}` : "/assets/default.jpg"}
                        alt="User Avatar"
                        className='object-cover w-30' />
                </figure>
                <div className="card-body">
                    <h1 className="card-title text-3xl">{data.profile.username}</h1>
                    <p><i>No bio yet</i></p>
                </div>
            </div>
            <div className="p-5 flex justify-center">
                {data.posts.length === 0 ? "Nothing in here yet" :
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {data.posts.map((post: Post, idx: number) =>
                            <PostCardComponent key={idx}
                                created_at={post.created_at}
                                files={post.files}
                                id={post.id}
                                title={post.title}
                                description={post.description} />
                        )}
                    </div>
                }
            </div>
        </>
    )
}