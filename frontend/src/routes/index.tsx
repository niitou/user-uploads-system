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
    <div className="p-5 flex justify-center">
      {posts.length === 0 ? "Nothing in here yet" : <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {posts.map((post: Post, idx: number) =>
          <PostCardComponent key={idx}
            id={post.id}
            title={post.title}
            description={post.description}
            userId={post.user?.id}
            profileId={post.user?.profile.id}
            profileUsername={post.user?.profile.username} 
            created_at={post.created_at} 
            files={post.files}/>
        )}
      </div>}
    </div>
  )
}
