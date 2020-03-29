import { firestoreAction } from 'vuexfire'

export const state = () => {
  posts: []
}

export const getters = {
  getPosts: (state: any) => state.posts
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }, ref) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('posts', ref)
  })
}
