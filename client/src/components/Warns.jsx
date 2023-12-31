import React, {useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useDispute } from "../contexts/DisputeContext"

const Warns = () => {
    const {sendDispute} = useDispute();
    const [reason, setReason] = useState("")
    const {user} = useAuth();
    const warns = user?.warns;
    if(warns.length === 0) return(
        <></>
    )
    const handler = (id, to) => {
        if(reason !== "")
        {
            sendDispute(id, to, reason)
            setReason("")
        }
    }
  return (

      <div className="bg-white shadow rounded-lg w-1/3">
        <h1 className="font-bold text-center text-3xl text-gray-900">Your Warns</h1>
        <div className="flex flex-col">
            {
                warns?.map((ea) => 
                    <div className="flex flex-col justify-between w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                        <span className="self-center font-bold ">from {ea.by}</span>
                        <span className="self-center font-bold ">Reason: {ea.reason}</span>
                        <span className="self-center font-bold ">On{(ea.postId)? "Post: " + ea.postId : "Profile"}</span>
                        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Want to dispute?" className="border border-gray-300"/>
                        <button onClick = {() => handler(ea._id, ea.to)} className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Dispute</button>
                    </div>
                )
            }
        </div>
      </div>

  )
}

export default Warns
