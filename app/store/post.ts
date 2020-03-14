import { firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
import { toastFail } from '~/utils/common'

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
    postData.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    postData.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    postRef.doc(docId).set(postData)
      .catch((error) => {
        console.error('Error adding post doc: ', error.code)
        toastFail('データベースへの登録に失敗しました。')
        throw error;
    })
  })
}

export const getters = {
  getPosts: (state: any) => state.posts
}
