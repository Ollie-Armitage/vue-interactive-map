<template>
  <div>

    <v-autocomplete @keydown.enter ="newSearch" outlined background-color="white" style="z-index: 1001; width:30%; margin: 20px"></v-autocomplete>

    <l-control position="topright">
      <v-btn @click="openLoginWindow" color="#33384d" dark>Login</v-btn>
    </l-control>

    <l-control position="topright">
      <v-btn @click="openSettingsWindow" color="#33384d" dark>Settings</v-btn>
    </l-control>

    <l-control position="bottomleft">
      <v-btn @click="newSearch('shop')" color="#33384d" dark>Display Shops</v-btn>
    </l-control>

    <v-bottom-navigation
      background-color="#33384d"
      dark
      fixed
      grow
      style="z-index: 1001"
    >
      <v-btn>
        <span>Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn>
        <span>Settings</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </div>
</template>

<script>
import { fetchTagValue } from '../services/overpass'

import { LControl } from 'vue2-leaflet'

export default {
  name: 'overlay-layer',
  data () {
    return {}
  },
  components: {
    LControl
  },
  methods: {
    LoggedInState () {
      return this.$store.getters.getLoggedIn
    },
    async newSearch (search) {
      console.log(search)
      this.$store.commit('setLoadingState', true)
      this.$store.commit('setCurrentSearch', await fetchTagValue(this, search).then(value => {
        return value
      }))
      this.$store.commit('setLoadingState', false)
    },
    openLoginWindow: function (event) {
      this.$store.commit('setLoginPopupOpen', true)
    },
    openSettingsWindow: function (event) {
      this.$store.commit('setSettingsPopupOpen', true)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
