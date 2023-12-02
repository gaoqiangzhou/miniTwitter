import React, {createContext, useState, useContext, useEffect } from 'react'
import axios from "axios";

const PostContext = createContext();
export function usePost()
{
    return useContext(PostContext);
}
export function PostContextProvider({children})
{
    const [posts, setPosts] = useState(null);
    const postAPI = "http://localhost:3000/post";
    const updatePosts = (newPosts) => {
        setPosts(newPosts);
    }
    const values = {
        posts: posts,
        updatePosts: updatePosts,
    }
    useEffect(() => {
        axios.get(postAPI)
        .then((res) => setPosts(res.data));
    }, [])
    return (
        <PostContext.Provider value = {values}>
            {children}
        </PostContext.Provider>
    )
}
