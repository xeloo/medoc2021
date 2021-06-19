import router from '../../router'
export function Authentication (state, data) {
  state.commit('setAuth', data)
  router.push('/')
}
