import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const clubRef = db.collection('clubs')

export const state = () => {
  clubs: []
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }, ref) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('clubs', ref)
  }),
  add: firestoreAction((context, { postData, docId, clubId }) => {
    clubRef.doc(clubId).collection('posts').doc(docId).set(postData)
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
  })
}

export const getters = {
  getClubs: (state: any) => state.clubs
}
