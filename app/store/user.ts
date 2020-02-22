
export const state = () => {
  loginUser: null
}

export const mutations = {
  setLoginUser(state: any, user: any) {
    state.loginUser = user
  }
}

export const actions = {

  setLoginUser({ commit }: any, user: any) {
    commit('setLoginUser', user)
  }
}
