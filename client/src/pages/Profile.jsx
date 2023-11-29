import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react'
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
const Profile = () => {
    const { id } = useParams();
    const [profileInfo, setProfileInfo] = useState();
    const API_USER = (id) => `http://localhost:3000/user/profile/${id}`
    useEffect(() => {
      axios.get(API_USER(id))
      .then(res => setProfileInfo(res.data))
      .catch(err => console.log(err))
    }, [])
  return (
    <body className="bg-gray-300 antialiased">
            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto"> 
                <div>
                    <h1 className="font-bold text-center text-3xl text-gray-900">{profileInfo?.name}</h1>
                    <p className="text-center text-sm text-gray-400 font-medium">{profileInfo?.type}</p>
                    
                    <div className="my-5 px-6">
                        <button className="w-full text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Follow</button>
                    </div>
                    <Tab.Group>
                      <Tab.List className="flex justify-between items-center my-5 px-6">
                        <Tab className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Recent Twitts</Tab>
                        <Tab className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Followers</Tab>
                        <Tab className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full py-3">Followings</Tab>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">Content 1</Tab.Panel>
                        <Tab.Panel className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">Content 2</Tab.Panel>
                        <Tab.Panel className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">Content 3</Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
    </body>
  )
}

export default Profile
