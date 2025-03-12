import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import axios from 'axios'
import { Post } from '../types/post'
import PostCardComponent from '../components/PostCardComponent'
import { useState } from 'react'


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
  const [posts, setPosts] = useState(useLoaderData({ from: "/" }) as Post[]) 
  const [search, setSearch] = useState("")

  const handleSearch = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/post?search=${search}`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.error(err))
  }
  return (
    <div className="w-full p-5 flex justify-center items-center flex-col h-screen">
      <div className="join m-5">
        <div>
          <label className="input validator join-item">
            <input type="text" minLength={3} value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
          <div className="validator-hint hidden">Must be more than 3 characters</div>
        </div>
        <button type="submit" className="btn btn-neutral join-item" onClick={handleSearch}>Search</button>
      </div>
      {
        posts.length === 0 ? "Nothing in here yet" : <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {posts.map((post: Post, idx: number) =>
            <PostCardComponent key={idx}
              id={post.id}
              title={post.title}
              description={post.description}
              userId={post.user?.id}
              profileId={post.user?.profile.id}
              profileUsername={post.user?.profile.username}
              created_at={post.created_at}
              files={post.files} />
          )}
        </div>
      }
    </div >
  )
}
