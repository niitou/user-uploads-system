import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { RootState, store } from '../store'
import { useSelector } from 'react-redux'

export const Route = createRootRouteWithContext<{ store: typeof store }>()({
    component: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const isAuth = useSelector((state:  RootState) => state.auth.token)
        console.log(isAuth)
        return (
            (

                <>
                    { }
                    <div className="p-2 flex gap-2">
                        <Link to="/" className="[&.active]:font-bold">Home </Link>
                        {
                            isAuth ?
                                <>
                                    <Link to="/dashboard" className="[&.active]:font-bold">Dashboard</Link>
                                    <Link to="/auth/logout" className='[&.active]:font-bold'>Logout</Link>
                                </> :
                                <>
                                    <Link to="/auth/login" className='[&.active]:font-bold'>Login </Link>
                                    <Link to='/auth/register' className='[&.active]:font-bold'>Register </Link>
                                </>
                        }
                        <Link to="/about" className="[&.active]:font-bold">About </Link>
                    </div>
                    <hr />
                    <Outlet />
                    <TanStackRouterDevtools />
                </>
            )
        )
    },
})