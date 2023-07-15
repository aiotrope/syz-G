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
    user: null,
    createdAt: null,
    updatedAt: null,
  },
})
