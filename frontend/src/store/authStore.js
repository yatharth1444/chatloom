import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
export const authStore =  create((set)=>({
    authUser : null,
    isCheckingAuth : true,
    isSigningUp : false,
    checkAuth : async () => {
        try {
        const res = await axiosInstance.get('/auth/check')
        set({authUser : res.data})
        } catch (error) {
            console.log("error", error);
            set({authUser: null})
            
        }finally{
            set({isCheckingAuth: false})
        }
    },
    signup : async(data) =>{
        set({isSigningUp: true})
            try {
                const res = await axiosInstance.post("/auth/signup", data)
                set({authUser: res.data})
                toast.success("Account created successfully")
            } catch (error) {
                const msg = error.response?.data?.message || "Signup failed";
                console.log("error", error.response?.data || error.message);
                toast.error(msg);
            }
            finally{
                set({isSigningUp: false})
            }
    }
}))
