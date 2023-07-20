import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'JWT',
  storage: localStorage,
  converter: JSON,
})

export const jwt_atom = atom({
  key: 'jwt_atom',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

export const user_atom = atom({
  key: 'user_atom',
  default: {
    id: null,
    username: '',
    email: '',
    bio: '',
    avatar: null,
    isStaff: null,
    posts: null,
    comments: null,
    createdAt: null,
    updatedAt: null,
  },
})

export const user_selector = selector({
  key: 'user_selector',
  get: ({ get }) => {
    const user = get(user_atom)
    return user
  },
})

export const users_atom = atom({
  key: 'users_atom',
  default: [],
})
