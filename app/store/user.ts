import firebase from 'firebase'
import auth from '~/plugins/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const userRef = db.collection('users')

export const state = () => ({
  isAuth: false,
  uid: '',
  displayName: '',
  email: '',
  photoURL: ''
})

export const mutations = {
  setLoginState(state: any, user: any) {
    state.isAuth = true
    state.uid = user.uid
    state.email = user.email
    state.displayName = user.displayName
    state.photoURL = user.photoURL
  },
  setLogoutState(state: any) {
    state.isAuth = false
    state.uid = ''
    state.email = ''
    state.displayName = ''
    state.photoURL = ''
  }
}

export const actions = {
  loginGoogle: async ({ commit }: any) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await loginCommon({ commit }, provider)
  },
  loginFacebook: async ({ commit }: any) => {
    const provider = new firebase.auth.FacebookAuthProvider()
    await loginCommon({ commit }, provider)
  },
  loginTwitter: async ({ commit }: any) => {
    const provider = new firebase.auth.TwitterAuthProvider()
    await loginCommon({ commit }, provider)
  },
  logout: ({ commit }: any) => {
    firebase.auth().signOut()
    commit('setLogoutState')
  },
  checkAuth: async ({ commit }: any) => {
    await auth()
      .then(user => {
        if (!!user) {
          commit('setLoginState', user)
        }
      })
  },
  add: firestoreAction((context, { postData, docId, userId }) => {
    userRef.doc(userId).collection('posts').doc(docId).set(postData)
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
  })
}

const loginCommon = ({ commit }: any, provider: any) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res: any) => commit('setLoginState', res.user))
    .catch(error => {
      console.error(error.code)
    })
}
