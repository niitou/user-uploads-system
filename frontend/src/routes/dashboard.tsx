import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
  beforeLoad : ({context}) => {
    const state = context.store.getState()
    if(!state.auth.token) {
      throw redirect({
        to : "/auth/login",
        search : {
          redirect : location.href
        }
      })
    }
  }
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}
