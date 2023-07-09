import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({ key: 'loggedInUser', storage: localStorage, converter: JSON })

export const jwt_atom = atom({
  key: 'jwt_atom',
  default: '',
  effects_UNSTABLE: [persistAtom],
})