<template>
  <div style="position:absolute; z-index: 1">

    <v-autocomplete
      @keydown.enter="newSearch($event.target.value)"
      :items=searchItems
      outlined background-color="white"
      style="margin: 20px;">
    </v-autocomplete>

    <v-bottom-navigation
      background-color="#33384d"
      dark
      fixed
      grow
    >
      <v-btn @click="openLoginWindow">
        <span>Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn @click="openSettingsWindow">
        <span>Settings</span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>

      <v-btn @click="directionSidebar = true">
        <span>Directions</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!--    Directions Sidebar-->

    <v-navigation-drawer
      hide-overlay
      v-model="directionSidebar"
      fixed
      temporary
      width="300">
      <v-app-bar color="#33384d" dark>
        <v-toolbar-title>Route Navigation</v-toolbar-title>
      </v-app-bar>
      <v-spacer></v-spacer>
      <v-text-field
        class="p-3"
        v-model="firstLocation"
        label="Where from ..."
      ></v-text-field>
      <v-text-field
        class="p-3"
        v-model="secondLocation"
        label="Where To ..."
      ></v-text-field>

      <div class="pa-2" @click="calculateRoute">
        <v-btn color="#33384d" block dark>Search</v-btn>
      </div>

    </v-navigation-drawer>

  </div>
</template>

<script>

import { fetchPlace, fetchSearchList } from '../services/overpass'

export default {
  name: 'overlay-layer',
  data () {
    return {
      searchItems: [],
      directionSidebar: false,
      firstLocation: null,
      secondLocation: null

    }
  },
  components: {},
  methods: {
    async newSearch (search) {
      console.log(search)
      this.$store.commit('setLoadingState', true)
      this.$store.commit('setCurrentSearch', await fetchPlace(this, search).then(value => {
        return value
      }))
      this.$store.commit('setLoadingState', false)
    },
    async calculateRoute () {
      const request = new XMLHttpRequest()
      var app = this

      request.open('GET', 'https://api.openrouteservice.org/v2/directions/foot-hiking?api_key=5b3ce3597851110001cf6248b1426a0951e44ffab46db840dab08c5a&start=-2.32793,51.37994&end=-2.32932,51.38002')

      request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8')

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          app.$store.commit('setCurrentRoute', JSON.parse(request.responseText))
        }
      }
      request.send()
    },
    openLoginWindow: function (event) {
      this.$store.commit('setLoginPopupOpen', true)
    },
    openSettingsWindow: function (event) {
      this.$store.commit('setSettingsPopupOpen', true)
    }

  },
  async mounted () {
    this.searchItems = await fetchSearchList(this)
  }
}
</script>

<style scoped>

</style>
