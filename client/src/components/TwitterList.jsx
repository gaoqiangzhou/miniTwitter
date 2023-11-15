import React, {useEffect, useState} from 'react'
import axios from "axios";
import TwitterBox from './TwitterBox';

const TwitterList = () => {
    const postAPI = "http://localhost:3000/post";
    const [posts, setPosts] = useState([]);
    //get all posts
    useEffect(() => {
        axios.get(postAPI).then((res) => {
            setPosts(res.data);
            console.log(posts)
        }).catch(err => {
            console.log("failed to get all posts")
        })
    }, [])
  return (
    <div className="flex flex-col gap-y-1">
        
      {posts.map((post) => 
      <div key = {post._id} value = {post.userId}>
        <TwitterBox 
        displayName={post.userName} 
        content={post.content} 
        />
        </div>
      )}
    </div>
  )
}

export default TwitterList
