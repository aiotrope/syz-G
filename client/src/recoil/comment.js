import { atom } from 'recoil'

// atoms for comments

export const comments_atom = atom({
  key: 'comments_atom',
  default: [],
})

export const comment_atom = atom({
  key: 'comment_atom',
  default: {
    id: null,
    commentary: null,
    commenter: {
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
    commentOn: {
      id: null,
      title: '',
      description: '',
      tags: null,
      entry: null,
      user: null,
      comments: null,
      createdAt: null,
      updatedAt: null,
    },
    createdAt: null,
    updatedAt: null,
  },
})
