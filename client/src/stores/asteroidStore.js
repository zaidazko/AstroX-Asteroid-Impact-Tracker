import {create} from 'zustand'

export const useAsteroidStore = create((set) => ({
    focusedId: null,
    setFocusedId: (id) => set({focusedId: id}),
    focusedName: 'Earth',
    setFocusedName: (name) => set({focusedName: name})
}))