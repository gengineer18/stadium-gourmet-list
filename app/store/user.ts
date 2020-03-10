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
  email: '',
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
    state.email = user.email
    state.photoURL = user.photoURL
  },
  setUserIsRegisteredTrue(state: any) {
    state.isRegistered = true
  },
  setLogoutState(state: any) {
    state.isAuth = false
    state.uid = ''
    state.displayName = ''
    state.photoURL = ''
    state.email = ''
    state.isRegistered = false
  }
}

export const actions = {
  loginGoogle: async ({ dispatch }: any) => {
    const provider = new firebase.auth.GoogleAuthProvider()
    await dispatch('loginCommon', provider)
  },
  loginFacebook: async ({ dispatch }: any) => {
    const provider = new firebase.auth.FacebookAuthProvider()
    await dispatch('loginCommon', provider)
  },
  loginTwitter: async ({ dispatch }: any) => {
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
        if(error.code === 'auth/popup-blocked') return
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
    userRef.doc(userId).collection('posts').doc(docId).set(postData, { merge: true })
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
  setUserRegistered: firestoreAction(({ commit }, { userData, userId }) => {
    userData.updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    userData.isRegistered = true
    userRef.doc(userId).set(userData, { merge: true })
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
    commit('setUserIsRegisteredTrue')
  }),
  getInitializeUser: (({ commit, dispatch }: any, userId :string) => {
    // return the promise returned by `bindFirestoreRef`
    const ref = db.collection('users').doc(userId)
    ref
      .get()
      .then((doc) => {
        if (doc.get('isRegistered')) {
          console.log('true called')
          commit('setUserIsRegisteredTrue')
        } else {
          console.log('false called')
          // ユーザー登録がなければ初期化してユーザーコレクションに追加
          const userData = {}
          dispatch('setInitializeUser', { userData, userId })
        }
      })
      .catch(error => {
        console.error('getInitializeUser', error)
      })
  })
}
