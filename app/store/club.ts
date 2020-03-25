import { firestoreAction } from 'vuexfire'
import firebase from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
import { toastFail } from '~/utils/common'

const clubRef = db.collection('clubs')

export const state = () => {
  clubs: []
}

export const getters = {
  getClubs: (state: any) => state.clubs
}


export const actions = {
  init: firestoreAction(({ bindFirestoreRef }, ref) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('clubs', ref)
  }),
  add: firestoreAction((context, { postData, docId, clubId }) => {
    postData.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    postData.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    clubRef.doc(clubId).collection('posts').doc(docId).set(postData)
      .catch((error) => {
        console.error('Error adding club doc: ', error.code)
        toastFail('データベースへの登録に失敗しました。')
        throw error;
    })
  }),
  deletePost: firestoreAction((context, { postId, clubId }) => {
    const deleteData = { isDeleted: true, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }
    clubRef.doc(clubId).collection('posts').doc(postId).set(deleteData, { merge: true })
      .catch((error: any) => {
        console.error('Error adding user doc: ', error.code)
        toastFail('データベースの更新に失敗しました。')
        throw error;
      })
  }),
}
