import { createRootRouteWithContext } from '@tanstack/react-router'
import RootComponent from '../components/RootComponent'
import { store } from '../store'

export const Route = createRootRouteWithContext<{ store: typeof store }>()({
    component: RootComponent
})