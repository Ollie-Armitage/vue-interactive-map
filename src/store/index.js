import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginPopupOpen: false,
    settingsBarOpen: false,
    loggedIn: false,
    baseMap: null,
    currentMap: null
  },
  mutations: {
    // Update States a-synchronously
    setLoginPopupOpen (state, payload) {
      state.loginPopupOpen = payload
    },
    setSettingsPopupOpen (state, payload) {
      state.settingsBarOpen = payload
    },
    setBaseMap (state, baseMap) {
      state.baseMap = baseMap
      state.currentMap = baseMap
    },
    setCurrentMap (state, currentMap) {
      state.currentMap = currentMap
    }
  },
  actions: {
    // Instantaneous (synchronous)
  },
  modules: {},
  getters: {

    getLoginWindowOpen (state) {
      return state.loginPopupOpen
    },
    getSettingsWindowOpen (state) {
      return state.settingsBarOpen
    },
    getCurrentMap (state) {
      return state.currentMap
    },
    getLoggedIn (state) {
      return state.loggedIn
    }

  }
})
