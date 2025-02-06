import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { store } from '../store'

export const Route = createRootRouteWithContext<{ store: typeof store }>()({
    component: () => (
        <>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">Home </Link>
                <Link to="/auth/login" className='[&.active]:font-bold'>Login </Link>
                <Link to='/auth/register' className='[&.active]:font-bold'>Register </Link>
                <Link to="/about" className="[&.active]:font-bold">About </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
})