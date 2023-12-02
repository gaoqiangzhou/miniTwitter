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
    const LIKAPI = (postId) =>  `http://localhost:3000/post/${postId}/like`;
    const DISLIKAPI = (postId) => `http://localhost:3000/post/${postId}/dislike`;
    const updatePosts = (newPosts) => {
        setPosts(newPosts);
    }
    const getPostById = (postId) => {
        return posts.filter((ea) => ea._id === postId)[0]
    }
    const like = (postUserId, userId, postId) => {
        const post = getPostById(postId);
        console.log(post);
        const [likes, setLikes] = useState(post.likes || []);
        const [dislikes, setDisLikes] = useState(post.dislikes || []);
        //if already liked?
        if(likes.reduce(
            (acc, cur) => acc || (userId === postUserId),
            false
        ))
        //cancel like
        {
            axios.put(LIKAPI(postId), {userId: userId})
            .then((res) => {
            setLikes(likes.filter((ea) => ea.user != userId));
            })
            .catch((err) => console.log(err))
        }
        else
        {
          //if disliked?
          if(dislikes.reduce(
            (acc, cur) => acc || (userId === postUserId),
            false
          ))
          {
            //cancel dislike
            axios.put(DISLIKAPI(postId), {userId: userId})
            .then((res) => {
              setDisLikes(dislikes.filter((ea) => ea.user != userId));
            }).catch((err) => console.log(err))
          }
          //add like
          axios.post(LIKAPI(postId), {userId: userId})
          .then((res) => {
            setLikes([...likes, {user: userId}]);
          }).catch((err) => console.log(err))
        }
        //update post
        const newPost = 
        {
            ...post,
            likes: likes,
            dislikes: dislikes
        }
        setPosts(posts
                .map((ea) => (ea._id === newPost._id)? newPost : ea))
    }
    const dislike = (postUserId, userId, postId) => {
        const post = getPostById(postId);
        console.log(post);
        const [likes, setLikes] = useState(post.likes || []);
        const [dislikes, setDisLikes] = useState(post.dislikes || []);
        //if already disliked?
        if(dislikes.reduce(
            (acc, cur) => acc || (userId === postUserId),
            false
        ))
        //cancel dislike
        {
            axios.put(DISLIKAPI(postId), {userId: userId})
            .then((res) => {
            setLikes(dislikes.filter((ea) => ea.user != userId));
            })
            .catch((err) => console.log(err))
        }
        else
        {
          //if liked?
          if(likes.reduce(
            (acc, cur) => acc || (userId === postUserId),
            false
          ))
          {
            //cancel like
            axios.put(LIKAPI(postId), {userId: userId})
            .then((res) => {
                setLikes(dislikes.filter((ea) => ea.user != userId));
            }).catch((err) => console.log(err))
          }
          //add dislike
          axios.post(DISLIKAPI(postId), {userId: userId})
          .then((res) => {
            setDisLikes([...likes, {user: userId}]);
          }).catch((err) => console.log(err))
        }
        //update post
        const newPost = 
        {
            ...post,
            likes: likes,
            dislikes: dislikes
        }
        setPosts(posts
                .map((ea) => (ea._id === newPost._id)? newPost : ea))
    }
    const values = {
        posts: posts,
        updatePosts: updatePosts,
        like: like,
        dislike: dislike
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
