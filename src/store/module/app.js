import {
  getBreadCrumbList,
  getHomeRoute
} from '../../libs/util'
import config from '../../config'
const { homeName } = config

export default {
  state: {
    breadCrumbList: []
  },
  getters: {
  },
  mutations: {
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
  },
  actions: {
  }
}