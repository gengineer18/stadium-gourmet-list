import firebase from 'firebase'
import auth from '~/plugins/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const userRef = db.collection('users')

export const state = () => ({
  isAuth: false,
  uid: '',
  displayName: '',
  photoURL: '',
  isRegistered: false,
})

export const getters = {
  userId: (state: any) => {
    if(state.uid !== '') return state.uid
    return 'guestUser'
  },
  userName: (state: any) => {
    if(state.displayName !== '') return state.displayName
    return 'ゲスト'
  }
}

export const mutations = {
  setLoginState(state: any, user: any) {
    state.isAuth = true
    state.uid = user.uid
    state.displayName = user.displayName
    state.photoURL = user.photoURL
  },
  setUserIsRegistered(state: any, isRegistered: boolean) {
    state.isRegistered = isRegistered
    console.log('setUserIsRegistered', isRegistered)
  },
  setLogoutState(state: any) {
    state.isAuth = false
    state.uid = ''
    state.displayName = ''
    state.photoURL = ''
    state.isRegistered = false
  }
}

export const actions = {
  loginGoogle: async ({ commit, dispatch }: any) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await dispatch('loginCommon', provider)
  },
  loginFacebook: async ({ commit, dispatch }: any) => {
    const provider = new firebase.auth.FacebookAuthProvider()
    await dispatch('loginCommon', provider)
  },
  loginTwitter: async ({ commit, dispatch }: any) => {
    const provider = new firebase.auth.TwitterAuthProvider()
    await dispatch('loginCommon', provider)
  },
  loginCommon: ({ commit, dispatch }: any, provider: any) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res: any) => {
        dispatch('getInitializeUser', res.user.uid)
        commit('setLoginState', res.user)
      })
      .catch(error => {
        console.error('loginCommon', error.code)
      })
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
    postData.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    postData.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    userRef.doc(userId).collection('posts').doc(docId).set(postData)
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
  }),
  setInitializeUser: firestoreAction((context, { userData, userId }) => {
    userData.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    userData.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    userData.isRegistered = false
    userRef.doc(userId).set(userData)
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
  }),
  getInitializeUser: (({ commit, dispatch }: any, userId :string) => {
    // return the promise returned by `bindFirestoreRef`
    const ref = db.collection('users').doc(userId)
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          // 登録済みなら
          if (doc.get('isRegistered')) {
            commit('setUserIsRegistered', true)
          }
          commit('setUserIsRegistered', false)
        }
        // ユーザー登録がなければ初期化してユーザーコレクションに追加
        const userData = {}
        dispatch('setInitializeUser', { userData, userId })
        return false
      })
      .catch(error => {
        console.error('getInitializeUser', error)
      })
  })
}
