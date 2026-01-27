import React from 'react'
import { chatStore } from '../store/useChatStore.js'
import UsersLoadingSkeleton from '../components/UsersLoadingSkeleton.jsx'
import { useEffect } from 'react'
const ContactList = () => {
    const {allContacts, setSelectedUser, isUsersLoading, getAllContacts, } = chatStore()
    useEffect(()=>{
        getAllContacts()
    },[getAllContacts])
    if(isUsersLoading) return <UsersLoadingSkeleton/>
    return (
    <>
    {allContacts.map((contact) => (
        <div
        key={contact._id}
        className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
        onClick={() => setSelectedUser(contact)}
        >
        <div className="flex items-center gap-3">
            {/* MAKE IT WORK WITH SOCKET */}
            <div className={`avatar online`}>
                        <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
            </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.fullname}</h4>
        </div>
        </div>
    ))}
    </>
);
}

export default ContactList
