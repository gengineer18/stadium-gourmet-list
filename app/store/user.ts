import firebase from 'firebase'

export const state = () => {
  loginUser: []
  isLogin: false
}

export const mutations = {
  setLoginState(state: any, user: any) {
    console.warn(user)
    state.loginUser = user
    state.isLogin = true
  },
  setLogoutState(state: any) {
    state.loginUser = []
    state.isLogin = false
  }
}

export const actions = {
  async loginGoogle({ commit }: any) {
    const provider = new firebase.auth.GoogleAuthProvider()
    await loginCommon({ commit }, provider)
  },
  async loginFacebook ({ commit }: any) {
    const provider = new firebase.auth.FacebookAuthProvider()
    await loginCommon({ commit }, provider)
  },
  async loginTwitter ({ commit }: any) {
    const provider = new firebase.auth.TwitterAuthProvider()
    await loginCommon({ commit }, provider)
  },
  logout ({ commit }: any) {
    firebase.auth().signOut()
    commit('setLogoutState')
  }
}

const loginCommon = ({ commit }: any, provider: any) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(res => commit('setLoginState', res.user))
    .catch(error => {
      if (error.code === 'auth/popup-closed-by-user') {
        // Do nothing.
      } else {
        // any
      }
    })
}
