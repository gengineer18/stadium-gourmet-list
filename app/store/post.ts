import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const postRef = db.collection('posts')

export const state = () => {
  posts: []
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }, ref) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('posts', ref)
  }),
  add: firestoreAction((context, { postData, docId }) => {
    postRef.doc(docId).set(postData)
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
  })
}

export const getters = {
  getPosts: (state: any) => state.posts
}
