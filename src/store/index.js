import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginPopupOpen: false,
    settingsBarOpen: false,
    loggedIn: false,
    baseMap: null,
    currentMap: null,
    currentSearch: null,
    currentlyLoading: false,
    currentRoute: null
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
    },
    setCurrentSearch (state, search) {
      if (search === null) {
        state.currentSearch = null
        return null
      }

      // Only store polygons in search results

      const endSearch = []
      search.features.forEach((item, index) => {
        if (item.geometry.type === 'Polygon') {
          endSearch.push(item)
        }
      }
      )
      search.features = endSearch
      state.currentSearch = search
    },
    setLoadingState (state, loading) {
      state.currentlyLoading = loading
    },
    setCurrentRoute (state, route) {
      state.currentRoute = route
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
    },
    getCurrentSearch (state) {
      return state.currentSearch
    },
    getLoadingState (state) {
      return state.currentlyLoading
    },
    getCurrentRoute (state) {
      return state.currentRoute
    }

  }
})
