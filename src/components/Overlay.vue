<template>
  <div style="position:absolute;">

    <v-autocomplete
      @keydown.enter="newSearch($event.target.value)"
      :items=searchItems
      outlined background-color="white"
      style="margin: 20px;">
    </v-autocomplete>

    <div v-if="!$auth.loading">
      <v-bottom-navigation
        background-color="#33384d"
        dark
        fixed
        grow
      >

        <!-- show login when not authenticated -->
        <v-btn v-if="!$auth.isAuthenticated" @click="login">
          <span>Login</span>

          <v-icon>mdi-login</v-icon>
        </v-btn>
        <!-- show logout when authenticated -->
        <v-btn v-if="$auth.isAuthenticated" @click="logout">
          <span>Logout</span>

          <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn @click="openSettingsWindow">
          <span>Settings</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn @click="directionsSettings = !directionsSettings">
          <span>Directions</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>

    <v-bottom-sheet v-model="directionsSettings" hide-overlay persistent>
      <v-sheet class="text-center" height="300px">
        <v-app-bar color="#33384d" dark>Get Directions
          <v-spacer></v-spacer>
          <v-btn rounded @click="directionsSettings = !directionsSettings">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <div class="m-4">
          <v-form>
            <v-autocomplete label="First Location" :items=searchItems :search-input.sync="firstLocation" hide-no-data
                            clearable></v-autocomplete>
            <v-autocomplete label="Second Location" :items=searchItems :search-input.sync="secondLocation" hide-no-data
                            clearable></v-autocomplete>
            <v-btn color="#33384d" @click="locate" dark>Search</v-btn>
          </v-form>

        </div>

      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="directionsBar" hide-overlay persistent>
      <v-sheet class="text-center" height="300px">
        <v-app-bar color="#33384d" dark>{{firstLocation}} to {{secondLocation}}
          <v-spacer></v-spacer>
          <v-btn rounded @click="closeDirections">
            <v-icon dark>mdi-close</v-icon>

          </v-btn>
        </v-app-bar>
        <div class="m-4">
          <v-form>
            <v-card>{{instructionList[instructionIndex]}}</v-card>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#33384d" dark @click="updateInstruction">Next Instruction</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

          </v-form>

        </div>

      </v-sheet>
    </v-bottom-sheet>

  </div>
</template>

<script>
import { queryOverpass, fetchBaseSearchList, getNamedLocationCoordinates } from '../services/overpass'
import { calculateRoute, removeMarkers } from '../services/openrouteservice'

export default {
  name: 'overlay-layer',
  data () {
    return {
      directionsSettings: false,
      directionsBar: false,
      searchItems: [],
      firstLocation: null,
      secondLocation: null,
      instructionList: [],
      instructionIndex: 0

    }
  },
  components: {},
  methods: {
    closeDirections () {
      this.directionsBar = !this.directionsBar
      this.instructionIndex = 0
      this.$store.commit('setCurrentRoute', null)
      removeMarkers(this)
    },
    updateInstruction () {
      if (this.instructionIndex < this.instructionList.length - 1) {
        this.instructionIndex++
      }
    },
    login () {
      this.$auth.loginWithRedirect()
    },
    // Log the user out
    logout () {
      this.$auth.logout({
        returnTo: window.location.origin
      })
    },
    async newSearch (search) {
      this.$store.commit('setLoadingState', true)
      this.$store.commit('setSelectedValue', await queryOverpass(this, search).then(value => {
        return value
      }))
      this.$store.commit('setLoadingState', false)
    },
    async locate () {
      if (this.firstLocation !== null && this.secondLocation !== null) {
        this.$store.commit('setCurrentRoute', await calculateRoute(this, await getNamedLocationCoordinates(this, this.firstLocation), await getNamedLocationCoordinates(this, this.secondLocation)))

        this.directionsSettings = false
        this.directionsBar = true

        const currentRoute = this.$store.getters.getCurrentRoute
        const currentRouteSegments = currentRoute.features[0].properties.segments[0].steps

        currentRouteSegments.forEach((value) => {
          this.instructionList.push(value.instruction)
        })

        this.currentInstruction = currentRouteSegments[0].instruction
      } else {
        this.$store.commit('setCurrentRoute', null)
        this.$store.commit('setRouteMarkers', null)
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
    this.searchItems = await fetchBaseSearchList(this)
  }
}
</script>

<style scoped>

</style>
