import { createFileRoute, redirect, useLoaderData } from '@tanstack/react-router'
import { showToast } from '../reducers/toastReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import AddPostModal from '../components/AddPostModal'
import UpdateUserModal from '../components/UpdateUserModal'
import DeleteUserModal from '../components/DeleteUserModal'
import axios from 'axios'
import { Post } from '../types/post'
import PostCardComponent from '../components/PostCardComponent'
export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  loader: async ({ context }) => {
    try {
      const state = context.store.getState()
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/${state.auth.user?.user_id}`)
      console.log(response)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("User doesn't exist");
      }
      throw new Error("Failed to fetch posts")
    }
  },
  beforeLoad: ({ context }) => {
    const state = context.store.getState()
    const dispatch = context.store.dispatch
    if (!state.auth.token) {
      dispatch(showToast({ message: "You must be logged in to do that !", type: "error" }))
      throw redirect({
        to: "/",
        throw: true
      })
    }
  }
})

function RouteComponent() {
  const user = useSelector((state: RootState) => state.auth)
  const posts = useLoaderData({ from: "/dashboard" })
  return (
    <>
      <div className="card card-side w-5xl bg-base-300 shadow-sm mx-auto my-5 border border-gray-100">
        <figure>
          <img
            src={user.user?.avatar ? `${import.meta.env.VITE_MEDIA_URL}/${user.user.avatar}` : "/assets/default.jpg"}
            alt="User Avatar"
            className='object-cover w-30' />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-3xl">{user.user?.username}</h1>
          <p><i>No bio yet</i></p>
          <div className="card-actions justify-end">
            <AddPostModal user_id={user.user?.user_id ?? 0} />
            <UpdateUserModal profile_id={user.user?.profile_id ?? 0} avatar={user.user?.avatar ?? ""} username={user.user?.username ?? ""} />
            <DeleteUserModal user_id={user.user?.user_id ?? 0} />
          </div>
        </div>
      </div>
      <div className="p-5 flex justify-center">
        {!posts ? <p className='italic'>Nothing to see here </p> :
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {posts.map((post: Post) =>
              <PostCardComponent key={post.id}
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
