import React from 'react'
import {authStore} from '../store/authStore.js'
export const ChatPage = () => {
    const {logout } = authStore()
return (
    <div className='z-10'>
        ChatPage
        <button onClick={logout}> logout </button>
    </div>
)
}

export default ChatPage
