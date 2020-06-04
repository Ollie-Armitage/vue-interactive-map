import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginPopupOpen: false,
    settingsBarOpen: false,
    loggedIn: false,
    currentMap: null,
    selectedValue: null,
    currentlyLoading: false,
    currentRoute: null,
    routeMarkers: [],
    currentTileLayer: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
    baseLayerJSON: null
  },
  mutations: {
    // Update States a-synchronously
    setBaseLayer (state, payload) {
      state.baseLayerJSON = payload
    },
    setCurrentTileLayer (state, payload) {
      state.currentTileLayer = payload
    },
    setRouteMarkers (state, payload) {
      state.routeMarkers = payload
    },
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
    setSelectedValue (state, search) {
      if (search === null) {
        state.selectedValue = null
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
      state.selectedValue = search
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
    getBaseLayer (state) {
      return state.baseLayerJSON
    },
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
    getLoadingState (state) {
      return state.currentlyLoading
    },
    getCurrentRoute (state) {
      return state.currentRoute
    },
    getRouteMarkers (state) {
      return state.routeMarkers
    },
    getTileLayer (state) {
      return state.currentTileLayer
    },
    getSelectedValue (state) {
      return state.selectedValue
    }

  }
})
