import { Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { IoPersonCircleOutline } from 'react-icons/io5'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import LogoutModal from './LogoutModal';

const RootComponent = () => {
    const isAuth = useSelector((state: RootState) => state.auth.token);
    return (
        (
            <>
                <div className="navbar bg-base-300 shadow-sm">
                    <div className="flex-1">
                        <Link to="/" className='btn btn-ghost text-2xl'>Home </Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li>
                                <details className='dropdown dropdown-end'>
                                    <summary className='m-1'>
                                        <IoPersonCircleOutline style={{ fontSize: "2em" }} />
                                    </summary>
                                    <ul className='menu dropdown-content bg-base-300 rounded-t-none p-2 shadow-sm'>
                                        {
                                            isAuth ?
                                                <>
                                                    <Link to="/dashboard" className='btn btn-ghost'>Dashboard</Link>
                                                    <LogoutModal />
                                                </> :
                                                <>
                                                    <LoginModal />
                                                    <RegisterModal />
                                                </>
                                        }
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <Outlet />
                <TanStackRouterDevtools />
            </>
        )
    )
}

export default RootComponent