import { firestoreAction } from 'vuexfire'

export const state = () => {
  clubs: []
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }, ref) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('clubs', ref)
  })
}

export const getters = {
  getClubs: (state: any) => state.clubs
}
