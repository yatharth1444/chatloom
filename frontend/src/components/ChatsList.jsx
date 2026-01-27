import React, { useEffect } from 'react'
import {chatStore} from "../store/useChatStore.js"
import UserLoadingSkeleton from './ActiveTabSwitch.jsx'
import NoChatsFound from '../components/NoChatsFound.jsx'
const ChatsList = () => {
const {getChatPartners, chats, isUsersLoading, setSelectedUser} = chatStore()
useEffect(()=>{
  getChatPartners()
},[getChatPartners])
if(isUsersLoading){
  return <div>Loading...</div>
}
if(chats.length === 0)return  <NoChatsFound></NoChatsFound>
if(isUsersLoading) return <UserLoadingSkeleton/>
    return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/*  FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullname} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullname}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList
