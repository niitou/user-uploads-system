import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import axios from 'axios'
import { Post } from '../types/post'
import PostCardComponent from '../components/PostCardComponent'


export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/post` // Get all post
      )
      console.log(response)
      return response.data
    } catch (error) {
      console.error(error)
      return []
    }
  },
  component: Index,
})

function Index() {
  const posts = useLoaderData({ from: "/" }) as Post[]
  return (
    <div className="p-2">
      {posts.length === 0 ? "Nothing here yet" : <div className='grid grid-cols-5 gap-5 m-5'>
        {posts.map((post: Post, idx: number) =>
          <PostCardComponent key={idx}
            title={post.title}
            description={post.description}
            userId={post.user?.id}
            profileId={post.user?.profile.id}
            profileUsername={post.user?.profile.username} />
        )}
      </div>}
    </div>
  )
}
