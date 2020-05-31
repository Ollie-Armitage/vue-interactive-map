<template>
  <div style="position:absolute;">

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

      <v-btn @click="directionsSheet = !directionsSheet">
        <span>Directions</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-bottom-sheet v-model="directionsSheet" hide-overlay persistent>
      <v-sheet class="text-center" height="300px">
        <v-app-bar color="#33384d" dark>Get Directions
          <v-spacer></v-spacer>
          <v-btn rounded @click="directionsSheet = !directionsSheet">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <div class="m-4">
          <v-form>
            <v-autocomplete label="First Location" :items=searchItems :search-input.sync="firstLocation" hide-no-data clearable></v-autocomplete>
            <v-autocomplete label="Second Location" :items=searchItems :search-input.sync="secondLocation" hide-no-data clearable></v-autocomplete>
            <v-btn color="#33384d" @click="locate" dark>Search</v-btn>
          </v-form>

        </div>

      </v-sheet>
    </v-bottom-sheet>

  </div>
</template>

<script>

import { fetchPlace, fetchSearchList, getLocation } from '../services/overpass'
import { calculateRoute } from '../services/openrouteservice'

export default {
  name: 'overlay-layer',
  data () {
    return {
      directionsSheet: false,
      searchItems: [],
      directionBar: false,
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
    async locate () {
      if (this.firstLocation !== null && this.secondLocation !== null) {
        await calculateRoute(this, await getLocation(this, this.firstLocation), await getLocation(this, this.secondLocation))
        this.directionsSheet = false
      }
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
