import { useEffect, useState } from "react"

export default function Post() {
    const [comments ,setComments] = useState([])

useEffect(()=>{
    fetch("http://localhost:8000/post_id")
    .then((res)=>res.json())
    .then((data)=>setComments(data))

},[])

  return (

    <div>Post</div>
  )
}