import { Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Theme, Navbar } from 'react-daisyui';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const RootComponent = () => {
    const isAuth = useSelector((state: RootState) => state.auth.token);
    return (
        (
            <Theme dataTheme="cupcake">
                <Navbar className='bg-base-100 shadow-xl rounded-box'>
                <Link to="/" color='primary'>Home </Link>
                {
                    isAuth ?
                        <>
                            <Link to="/dashboard" className='btn'>Dashboard</Link>
                            <Link to="/auth/logout" className='btn'>Logout</Link>
                        </> :
                        <>
                            <Link to="/auth/login" className='btn'>Login </Link>
                            <Link to='/auth/register' className='btn'>Register </Link>
                        </>
                }
                <Link to="/about" className="[&.active]:font-bold">About </Link>
                </Navbar>
                <Outlet />
                <TanStackRouterDevtools />
            </Theme>
        )
    )
}

export default RootComponent