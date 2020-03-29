import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

export const state = () => ({
  clubs: [],
  postData: {
    postId: '',
    comment: '',
    gameDate: null,
    imagePath: '',
    price: null,
    shop: '',
    createdAt: null,
    updatedAt: null,
    club: {
      id: '',
      name: ''
    },
    user: {
      id: '',
      name: '',
      photo: ''
    },
    isDeleted: false
  }
})

export const getters = {
  getClubs: (state: any) => state.clubs
}

export const mutations = {
  postData(state: any, { data }: any) {
    state.postData.postId = data.postId
    state.postData.comment = data.comment
    state.postData.gameDate = data.gameDate
    state.postData.imagePath = data.imagePath
    state.postData.price = data.price
    state.postData.shop = data.shop
    state.postData.createdAt = data.createdAt
    state.postData.updatedAt = data.updatedAt
    state.postData.club.id = data.club.id
    state.postData.club.name = data.club.name
    state.postData.user.id = data.user.id
    state.postData.user.name = data.user.name
    state.postData.user.photo = data.user.photo
    state.postData.isDeleted = data.isDeleted || false
  }
}

export const actions = {
  init: firestoreAction(({ bindFirestoreRef }, ref) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('clubs', ref)
  }),
  initPost: async ({ commit }: any, { docRefId }: any) => {
    const postData = await db.collectionGroup('posts').where('postId', '==', docRefId).get()
    await postData.docs.map((doc) => {
      commit('postData', { data: doc.data() })
    })
  },
}
