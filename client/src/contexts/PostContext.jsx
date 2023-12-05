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
    const READ_API = (postId) =>  `http://localhost:3000/post/${postId}/reads`;
    const COMPLAIN_POST = "http://localhost:3000/complain/"
    const updatePosts = (newPosts) => {
        setPosts(newPosts);
    }
    const getPostById = (postId) => {
        return posts?.filter((ea) => ea._id === postId)[0]
    }
    const read = (userId, postId) => {
        const post = getPostById(postId);
        const reads = post?.reads;
        axios.post(READ_API(postId), {userId: userId})
        .then((res) => {
            if(reads.reduce(
                (acc, cur) => acc && (cur != userId),
                true
            ))
            {
                setPosts(posts
                    .map((ea) => (ea._id === post._id)? 
                    ({
                        ...ea,
                        reads: [...reads, userId]
                    }) 
                    :
                    (ea)))
            }   
        })
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
    const complainPost = (userId, postId, reason) => {
        const post = getPostById(postId);
        const postUserId = post?.userId;
        const complaints = post?.complaints;
        axios.post(COMPLAIN_POST, {by: userId, reason: reason, to: postUserId, postId: postId, type: "post"})
             .then((res) => {
                if (res.data.status === "FAILED") throw new Error(res.data.message);
                setPosts((prev) => 
                    prev?.map((ea) => (ea._id === postId)?
                    (
                        {
                            ...ea,
                            complaints: [...complaints, {by: userId, reason: reason, _id: res.data.complain._id}]
                        }
                    ):
                    (ea))
                )
             })
             .catch((err) => console.log(err));
    }
    // const cancelComplainPost = (postId, postUserId, complainId) => {
    //     const post = getPostById(postId);
    //     const complaints = post?.complaints;
    //     axios.put(COMPLAIN_POST(postId), {postUserId: postUserId, complainId: complainId})
    //     .then((res) => {
    //         if (res.data.status === "FAILED") throw new Error(res.data.message);
    //         setPosts((prev) => 
    //             prev?.map((ea) => (ea._id === postId)) ?
    //             ({
    //                 ...ea,
    //                 complaints: complaints.filter((ea) => ea._id !== complainId)
    //             }) :
    //             (ea)
    //         )
    //     })
    //     .catch((err) => console.log(err));
    // }
    const values = {
        posts: posts,
        updatePosts: updatePosts,
        like: like,
        dislike: dislike,
        read: read,
        complainPost: complainPost,
        // cancelComplainPost: cancelComplainPost
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
