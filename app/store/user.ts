import firebase from 'firebase'
import auth from '~/plugins/auth'

export const state = () => ({
  isAuth: false,
  displayName: '',
  email: '',
  photoURL: ''
})

export const mutations = {
  setLoginState(state: any, user: any) {
    state.isAuth = true
    state.email = user.email
    state.displayName = user.displayName
    state.photoURL = user.photoURL
    console.log('calllogin', state.isAuth)
  },
  setLogoutState(state: any) {
    state.isAuth = false
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
        console.log('called!!!!!!!')
        if (!!user) {
          console.log('called!!')
          commit('setLoginState', user)
        }
      })
  }
}

const loginCommon = ({ commit }: any, provider: any) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((res: any) => commit('setLoginState', res.user))
    .catch(error => {
      if (error.code === 'auth/popup-closed-by-user') {
        // Do nothing.
      } else {
        // any
      }
    })
}
