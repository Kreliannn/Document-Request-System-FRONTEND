import {create } from "zustand"


let useApproveRequestStore = create((set)=>({
    request : [],
    setRequest : (data) => set({request : data}),
    removeRequest : (id) => set((state) => ({ request : state.request.filter((req) => req._id != id) })),
}))

export default useApproveRequestStore