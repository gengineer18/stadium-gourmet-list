import firebase from 'firebase'
import auth from '~/plugins/auth'
import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'
import { toastSuccess, toastFail } from '~/utils/common'

const userRef = db.collection('users')

export const state = () => ({
  isAuth: false,
  isAnonymous: true,
  uid: '',
  displayName: '',
  photoURL: '',
  email: '',
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
    state.isAnonymous = user.isAnonymous
    state.uid = user.uid
    state.displayName = user.displayName || 'ゲスト'
    state.email = user.email
    state.photoURL = user.photoURL
  },
  setLogoutState(state: any) {
    state.isAuth = false
    state.isAnonymous = true
    state.uid = ''
    state.displayName = ''
    state.photoURL = ''
    state.email = ''
  },
  loginAnonymous(state: any, user: any) {
    state.isAuth = true
    state.isAnonymous = true
    state.uid = user.uid
    state.displayName = 'ゲスト'
    state.email = user.email
    state.photoURL = user.photoURL
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
  loginAnonymous: ({ commit }: any, { user }:any) => {
    commit('loginAnonymous', { user })
  },
  loginCommon: ({ commit, dispatch }: any, provider: any) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res: any) => {
        dispatch('getInitializeUser', { user: res.user })
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
    toastSuccess('ログアウトしました。')
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
        console.error('Error adding user doc: ', error.code)
        toastFail('データベースへの登録に失敗しました。')
        throw error;
    })
  }),
  userCreate: firestoreAction((context, { user }) => {
    const data = {
      userId: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    userRef.doc(data.userId).collection('credentials').doc(data.userId).set(data)
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
  }),
  getInitializeUser: (({ dispatch }: any, { user }: any) => {
    // return the promise returned by `bindFirestoreRef`
    const ref = db.collection('users').doc(user.uid)
    ref
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('false called')
          // ユーザー登録がなければ初期化してユーザーコレクションに追加
          dispatch('userCreate', { user })
        }
      })
      .catch(error => {
        console.error('getInitializeUser', error)
      })
  })
}
