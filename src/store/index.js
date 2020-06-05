import Vue from 'vue'
import Vuex from 'vuex'
import { getBaseQuery } from '../services/overpass'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginPopupOpen: false,
    settingsBarOpen: false,
    loggedIn: false,
    selectedValue: null,
    currentlyLoading: false,
    currentRoute: null,
    routeMarkers: [],
    currentTileLayer: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
    baseData: null,
    baseCurrentlyLoading: false,
    filterLoading: false,
    selectedFilter: null,
    downloadedFilters: []
  },
  mutations: {
    // Update States a-synchronously
    setBaseData: (state, payload) => (state.baseData = payload),
    setCurrentTileLayer: (state, payload) => (state.currentTileLayer = payload),
    setRouteMarkers: (state, payload) => (state.routeMarkers = payload),
    setLoginPopupOpen: (state, payload) => (state.loginPopupOpen = payload),
    setSettingsPopupOpen: (state, payload) => (state.settingsBarOpen = payload),
    setCurrentRoute: (state, route) => (state.currentRoute = route),
    setLoadingState: (state, loading) => (state.currentlyLoading = loading),
    setBaseLoadingState: (state, loading) => (state.baseCurrentlyLoading = loading),
    setSelectedValue: (state, search) => (state.selectedValue = search),
    setFilterLoading: (state, loading) => (state.filterLoading = loading),
    setSelectedFilter: (state, filter) => (state.selectedFilter = filter),
    setDownloadedFilters: (state, filters) => (state.downloadedFilters = filters)
  },
  actions: {
    // Instantaneous (synchronous)
    async downloadBaseData ({ commit }) {
      const osmtogeojson = require('osmtogeojson')
      commit('setBaseLoadingState', true)
      const overpassLink = getBaseQuery()
      const overpassData = await axios.get(overpassLink)
      const geoJSONOverpassData = osmtogeojson(overpassData.data)

      geoJSONOverpassData.features.forEach((feature, index) => {
        if (feature.properties.name === 'University of Bath') geoJSONOverpassData.features.splice(index, 1)
        if (feature.properties.name === undefined) feature = identifyNames(feature)
      })

      commit('setBaseData', geoJSONOverpassData)
      commit('setBaseLoadingState', false)
    }

  },
  modules: {},
  getters: {
    getBaseData: state => state.baseData,
    getLoginWindowOpen: state => state.loginPopupOpen,
    getSettingsWindowOpen: state => state.settingsBarOpen,
    getLoggedIn: state => state.loggedIn,
    getLoadingState: state => state.currentlyLoading,
    getCurrentRoute: state => state.currentRoute,
    getRouteMarkers: state => state.routeMarkers,
    getTileLayer: state => state.currentTileLayer,
    getSelectedValue: state => state.selectedValue,
    getBaseLoading: state => state.baseCurrentlyLoading,
    getFilterLoading: state => state.filterLoading,
    getDownloadedFilters: state => state.downloadedFilters,
    getSelectedFilter: state => state.selectedFilter
  }
})

function identifyNames (feature) {
  if (feature.properties['addr:housenumber'] !== undefined) {
    feature.properties.name = feature.properties['addr:housenumber']
  } else if (feature.properties['addr:housename'] !== undefined) {
    feature.properties.name = feature.properties['addr:housename']
  } else {
    feature.properties.name = 'Building'
  }

  return feature
}
