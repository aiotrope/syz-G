// keys for tanstack query and muatations
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), { filters }],
  details: () => [...userKeys.all, 'detail'],
  detail: (id) => [...userKeys.details(), id],
}

export const postKeys = {
  all: ['posts'],
  lists: () => [...postKeys.all, 'list'],
  list: (filters) => [...postKeys.lists(), { filters }],
  details: () => [...postKeys.all, 'detail'],
  detail: (id) => [...postKeys.details(), id],
}

export const commentKeys = {
  all: ['comments'],
  lists: () => [...commentKeys.all, 'list'],
  list: (filters) => [...commentKeys.lists(), { filters }],
  details: () => [...commentKeys.all, 'detail'],
  detail: (id) => [...commentKeys.details(), id],
}
