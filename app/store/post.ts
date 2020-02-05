import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const projects = db.collection('post')


export const state = () => {
  posts: []
}

export const actions = {
  setPostsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('posts', ref)
  })
}

export const getters = {
  getPosts: (state: any) => state.posts
}
