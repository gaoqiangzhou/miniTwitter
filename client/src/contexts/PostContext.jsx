import React, {createContext, useState, useContext, useEffect } from 'react'
import axios from "axios";

const PostContext = createContext();
export function usePost()
{
    return useContext(PostContext);
}
export function PostContextProvider({children})
{
    const [posts, setPosts] = useState([]);
    const postAPI = "http://localhost:3000/post";
    const LIKAPI = (postId) =>  `http://localhost:3000/post/${postId}/like`;
    const DISLIKAPI = (postId) => `http://localhost:3000/post/${postId}/dislike`;
    const updatePosts = (newPosts) => {
        setPosts(newPosts);
    }
    const getPostById = (postId) => {
        return posts?.filter((ea) => ea._id === postId)[0]
    }
    const like = (userId, postId) => {
        const post = getPostById(postId);
        const likes = post?.likes;
        const dislikes = post?.dislikes;
        //if already liked?
        if(likes.reduce(
            (acc, cur) => acc || (userId === cur.user),
            false
        ))
        //cancel like
        {
            axios.put(LIKAPI(postId), {userId: userId})
            .then((res) => {
                setPosts(posts
                    .map((ea) => (ea._id === post._id)? 
                    ({
                        ...ea,
                        likes: likes.filter((ea1) => ea1.user != userId)
                    }) 
                    :
                    (ea)))
            })
            .catch((err) => console.log(err))
        }
        else
        {
          //if disliked?
          if(dislikes.reduce(
            (acc, cur) => acc || (userId === cur.user),
            false
          ))
          {
            //cancel dislike
            axios.put(DISLIKAPI(postId), {userId: userId})
            .then((res) => {
                setPosts((prev) =>
                    prev
                    .map((ea) => (ea._id === post._id)? 
                    ({
                        ...ea,
                        dislikes: dislikes.filter((ea1) => ea1.user != userId)
                    }) 
                    :
                    (ea)))
            }).catch((err) => console.log(err))
          }
          //add like
          axios.post(LIKAPI(postId), {userId: userId})
          .then((res) => {
            setPosts((prev) => 
                prev
                .map((ea) => (ea._id === post._id)? 
                ({
                    ...ea,
                    likes: [...likes, {user: userId}]
                }) 
                :
                (ea)))
          }).catch((err) => console.log(err))
        }
    }
    const dislike = (userId, postId) => {
        const post = getPostById(postId);
        const likes = post?.likes;
        const dislikes = post?.dislikes;
        //if already disliked?
        if(dislikes.reduce(
            (acc, cur) => acc || (userId === cur.user),
            false
        ))
        //cancel dislike
        {
            axios.put(DISLIKAPI(postId), {userId: userId})
            .then((res) => {
                setPosts(posts
                    .map((ea) => (ea._id === postId)? 
                    ({
                        ...ea,
                        dislikes: dislikes.filter((ea1) => ea1.user != userId)
                    }) 
                    :
                    (ea)))
            })
            .catch((err) => console.log(err))
        }
        else
        {
          //if liked?
          if(likes.reduce(
            (acc, cur) => acc || (userId === cur.user),
            false
          ))
          {
            //cancel like
            axios.put(LIKAPI(postId), {userId: userId})
            .then((res) => {
                setPosts((prev) => 
                    prev
                    .map((ea) => (ea._id === postId)? 
                    ({
                        ...ea,
                        likes: likes.filter((ea1) => ea1.user != userId)
                    }) 
                    :
                    (ea)))
            }).catch((err) => console.log(err))
          }
          //add dislike
          axios.post(DISLIKAPI(postId), {userId: userId})
          .then((res) => {
            setPosts((prev) =>
                prev
                .map((ea) => (ea._id === postId)? 
                ({
                    ...ea,
                    dislikes: [...dislikes, {user: userId}]
                }) 
                :
                (ea)))
          }).catch((err) => console.log(err))
        }
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
