import { createFileRoute, redirect } from '@tanstack/react-router'
import { showToast } from '../reducers/toastReducer'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const state = context.store.getState()
    const dispatch = context.store.dispatch
    if (!state.auth.token) {
      dispatch(showToast({message: "You must be logged in to do that !", type : "error"}))
      throw redirect({
        to :"/",
        throw : true
      })
    }
  }
})

function RouteComponent() {
  return (
    <div>
      Hello "/dashboard"!
    </div>
  )
}
