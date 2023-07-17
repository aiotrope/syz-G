import { atom } from 'recoil'

export const posts_atom = atom({
  key: 'posts_atom',
  default: [],
})

export const post_atom = atom({
  key: 'post_atom',
  default: {
    id: null,
    title: '',
    description: '',
    tags: null,
    entry: null,
    upVote: null,
    downVote: null,
    user: {
      id: null,
      username: '',
      email: '',
      bio: '',
      avatar: null,
      isStaff: null,
      posts: null,
      createdAt: null,
      updatedAt: null,
    },
    createdAt: null,
    updatedAt: null,
  },
})
