import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import ToastComponent from './ToastComponent';
import NavbarComponent from './NavbarComponent';

const RootComponent = () => {
    
    return (
        (
            <>
                <NavbarComponent/>
                <Outlet />
                <ToastComponent/>
                <TanStackRouterDevtools />
            </>
        )
    )
}

export default RootComponent