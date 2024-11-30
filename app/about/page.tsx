
// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   date: string,
//   category: string;
// }
// export default async function Page() {
//   let data = await fetch('https://api.vercel.app/blog')
//   let posts : Post[] = await data.json()
//   console.log(posts)
//   return (
//     <ul>
//       {posts.map((post) => (
//         <li key={post.id}>{post.title}</li>
//       ))}
//       about sas
//     </ul>
//   )
// }

"use client"
import { useEffect, useState } from "react";
import useSWR from 'swr'

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filter, setFilter] = useState<boolean>(false)
  const { data, error } = useSWR('https://api.vercel.app/blog', async (url) => {
    const response = await fetch(url)
    return await response.json()
  })

  useEffect(() => {
    if (data) {
      setPosts(data)
    }
  }, [data])

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const updateFilter = () => {
    setFilter(!filter)
  }
  console.log(filter, "filterd")
  return (
    <ul>
      <button onClick={updateFilter}>Update Filter</button>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
      about sas
    </ul>
  )
}