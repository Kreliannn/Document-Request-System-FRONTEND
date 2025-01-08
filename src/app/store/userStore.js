import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default useUserStore;
