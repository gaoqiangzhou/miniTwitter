import React, {useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
const AddComplain = (props) => {
    const {complainPost} = usePost()
    const {user} = useAuth();
    const userId = (user)? user._id : "Suffer"
    const [reason, setReason] = useState("");
    const handler = (e) => {
      e.preventDefault();
      if(reason !== "")
      {
        if(user) complainPost(userId, props.postId, reason)
        else complainPost("Surfer", props.postId, reason)
        props.setShowAddComplaint(false)
      }
    }
  return (
    <form onSubmit={handler} className="flex flex-row">
      <label className="font-bold">Add your Complain:</label>
      <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="You reason to Complain?" className="border border-gray-300"/>
      <button className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Complain</button>
    </form>
  )
}

export default AddComplain
