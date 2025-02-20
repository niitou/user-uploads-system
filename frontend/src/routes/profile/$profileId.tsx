import { createFileRoute, ErrorComponent, useLoaderData } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/profile/$profileId')({
    loader: async ({ params }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/profile/${params.profileId}`,
            )
            console.log(response)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status == 404) {
                throw new Error('Profile is not exist')
            }
            throw new Error('Failed to fetch profile')
        }
    },
    component: RouteComponent,
    errorComponent: ({ error }) => <ErrorComponent error={error} />,
})

function RouteComponent() {
    // Need to get all the posts under this profile
    const profile = useLoaderData({from : "/profile/$profileId"})
    return <div>{JSON.stringify(profile)}</div>
}