import React, { useState } from "react";

const FollowButton = (props) => {
    const [isActive, setIsActicve] = useState(true)
  return (
    <div>
        {
            isActive ?
            <button onClick={() => {props.handler(); setIsActicve((prev) => !prev)}} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Follow</button>
            :
            <p className="text-center text-sm text-gray-400 font-medium">Followed</p>
        }
    </div>
  )
}

export default FollowButton
