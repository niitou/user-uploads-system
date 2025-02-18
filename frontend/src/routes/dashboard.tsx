import { createFileRoute, redirect } from '@tanstack/react-router'
import { showToast } from '../reducers/toastReducer'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import AddPostModal from '../components/AddPostModal'
import UpdateUserModal from '../components/UpdateUserModal'
export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
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
  return (
    <>
      <div className="card card-side w-5xl bg-base-300 shadow-sm mx-auto my-5 border border-gray-100">
        <figure>
          <img
            src={user.user?.avatar ? `${import.meta.env.VITE_MEDIA_URL}/${user.user.avatar}`: "/assets/default.jpg"} 
            alt="User Avatar"
            className='object-cover w-30' />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-3xl">{user.user?.username}</h1>
          <p><i>No bio yet</i></p>
          <div className="card-actions justify-end">
            <AddPostModal user_id={user.user?.user_id?? 0}/>
            <UpdateUserModal profile_id={user.user?.profile_id ?? 0} avatar={user.user?.avatar ?? ""} username={user.user?.username ?? ""}/>
            <button className="btn btn-error">Delete Profile</button>
          </div>
        </div>
      </div>
    </>
  )
}
