import {create } from "zustand"


let useUserRequestStore = create((set)=>({
    request : [],
    setRequest : (data) => set({request : data}),
    removeRequest : (id) => set((state) => ({ request : state.request.filter((req) => req._id != id) })),
}))

export default useUserRequestStore