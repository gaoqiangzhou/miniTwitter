import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import TwitterBox from "../components/TwitterBox";

import axios from "axios";
const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, updateUser } = useAuth();
    const [profileInfo, setProfileInfo] = useState();
    const [posts, setPosts] = useState([]);
    const API_USER = (id) => `http://localhost:3000/user/profile/${id}`
    const SUBAPI = "http://localhost:3000/subscribe";
    const POST_API = (id) => `http://localhost:3000/post/${id}`
    const subscribe = () => {
      axios
        .post(SUBAPI, { followId: profileInfo._id, followerId: user._id })
        .then((res) => {
          if (res.data.status === "FAILED") throw new Error(res.data.message);
          //update user state and localstorage after succefully sub
          const newUserState = {
            ...user,
            following: [...user.following, {_id: profileInfo._id, name: profileInfo.name}],
          };
          localStorage.setItem("user", JSON.stringify(newUserState));
          updateUser(newUserState);
        })
        .catch((err) => console.log(err));
    };
    const unSubscribe = () => {
      axios
        .put(SUBAPI, { followId: profileInfo._id, followerId: user._id })
        .then((res) => {
          if (res.data.status === "FAILED") throw new Error(res.data.message);
          //update user state and localstorage after succefully unsub
          const newUserState = {
            ...user,
            following: user.following.filter((e) => e._id !== profileInfo._id),
          };
          localStorage.setItem("user", JSON.stringify(newUserState));
          updateUser(newUserState);
        })
        .catch((err) => console.log(err));
    };
    useEffect(() => {
      axios.get(API_USER(id))
      .then(res => setProfileInfo(res.data))
      .catch(err => console.log(err));

      axios.get(POST_API(id))
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
    }, [id])
  return (
    <div className="bg-gray-300 antialiased">
            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto"> 
                <div>
                    <h1 className="font-bold text-center text-3xl text-gray-900">{profileInfo?.name}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium">{profileInfo?.type}</p>
                    
                    {(profileInfo?.type != user?.type) && (
                    <div className="my-5 px-6">
                        {(user?.following.reduce((acc, cur) => acc || (cur._id === profileInfo?._id), false)) ? 
                        (<button onClick={unSubscribe} className="w-full text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">unFollow</button>) :
                        (<button onClick={subscribe} className="w-full text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Follow</button>)}
                    </div>)}
                    <Tab.Group>
                      <Tab.List className="flex justify-between items-center my-5 px-6">
                        <Tab className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Recent Twitts</Tab>
                        <Tab className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Followers</Tab>
                        <Tab className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Followings</Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                          {posts.map((post) => 
                          <div key = {post._id} className="w-full">
                            <TwitterBox 
                            displayName={post.userName} 
                            content={post.content} 
                            postId={post._id}
                            userId={post.userId}
                            initialLikes={post.likes}
                            initialDislikes={post.dislikes}
                            initcomments={post.comments}
                            />
                          </div>
                          )}
                        </Tab.Panel>
                        <Tab.Panel className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                          {
                            profileInfo?.followers.map((ea) =>
                            <div onClick={() => navigate("../profile/"+ea._id, { replace: true })} className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                              {ea.name}
                            </div>
                            )
                          }
                        </Tab.Panel>
                        <Tab.Panel className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                        {
                            profileInfo?.followings.map((ea) =>
                            <div onClick={() => navigate("../profile/"+ea._id, { replace: true })} className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                              {ea.name}
                            </div>
                            )
                          }
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
    </div>
  )
}

export default Profile
