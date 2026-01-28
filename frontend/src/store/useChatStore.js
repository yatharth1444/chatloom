import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const chatStore = create( (set, get) => ({
    chats : [],
    allContacts: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
    toggleSound : ()=>{
        localStorage.setItem("isSoundEnabled", JSON.stringify(!get().isSoundEnabled))
        set({isSoundEnabled : !get().isSoundEnabled})
    },
    setActiveTab : (tab)=> set({activeTab: tab}),
    setSelectedUser : (selectedUser) => set({selectedUser: selectedUser}),
    getAllContacts: async () => {
        set({isUsersLoading : true})
        try {
            const res =  await axiosInstance.get("/messages/contacts")
            set({allContacts: res.data})
            toast.success("fetched all contacts")
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading : false})
        }
    },
    getChatPartners : async () => {
        set({isUsersLoading : true})
        try {
            const res =  await axiosInstance.get("/messages/chats")
            set({chats: res.data})
            toast.success("fetched chat partners ")
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading : false})
        }
    },
    getMessagesByUserId : async (userId) => {
        set({isMessagesLoading : true})
        try {
            const res =  await axiosInstance.get(`/messages/${userId}`)
            set({messages: res.data})
            toast.success("fetched messages ")
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message)
        }finally{
            set({isMessagesLoading : false})
        }
}
}))