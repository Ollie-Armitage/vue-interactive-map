<template>
  <div style="position:absolute;">

    <!-- Search Bar -->

    <v-autocomplete
      @keydown.enter="newSearch($event.target.value)"
      :items=searchBarDataList
      outlined background-color="white"
      style="margin: 20px;">
    </v-autocomplete>

    <!--  Navigation Bar  -->

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
          <v-avatar size="24"><img :src="$auth.user.picture" alt="Image"></v-avatar>
        </v-btn>

        <v-btn @click="openSettingsWindow">
          <span>Settings</span>
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn @click="directionsSettings = !directionsSettings">
          <span>Directions</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>

        <v-menu top :offset-y="true">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">
              <span>Filters</span>
              <v-icon>mdi-puzzle-plus-outline</v-icon>
            </v-btn>

          </template>
          <v-list>
            <v-list-item
              v-for="(item) in filterList"
              :key="item.id"
              @click="applyFilter(item)"
            >

              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-bottom-navigation>

    </div>

    <!--  Directions Settings Bar -->

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
            <v-autocomplete label="First Location" :items=searchBarDataList :search-input.sync="firstLocation"
                            hide-no-data
                            clearable></v-autocomplete>
            <v-autocomplete label="Second Location" :items=searchBarDataList :search-input.sync="secondLocation"
                            hide-no-data
                            clearable></v-autocomplete>
            <v-btn color="#33384d" @click="locate" dark>Search</v-btn>
          </v-form>

        </div>

      </v-sheet>
    </v-bottom-sheet>

    <!--  Directions Bar  -->

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

    <!--  Properties Bar  -->

    <div v-if="propertyList !== null">
      <v-navigation-drawer
        app
        right
        v-model=propertiesBar>
        <v-app-bar color="#33384d" dark>{{propertyList.name}} Properties
          <v-spacer></v-spacer>
          <v-btn rounded @click="closeProperties">
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
        <div class="m-4">

          <v-form>
            <ul v-for="(value, key) in propertyList" :key="key"><b>{{key}}:</b> {{value}}</ul>
          </v-form>

        </div>

      </v-navigation-drawer>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { calculateRoute } from '../services/openrouteservice'
import { downloadFilterData } from '../services/overpass'

export default {
  name: 'overlay-layer',
  computed: {
    ...mapGetters(['getBaseData', 'getCurrentRoute', 'getLoadingState', 'getSelectedValue', 'getDownloadedFilters']),
    ...mapState(['baseData']),
    storedBaseData () {
      return this.getBaseData
    },
    currentlySelectedValue () {
      return this.getSelectedValue
    }
  },
  watch: {
    storedBaseData (value) {
      if (typeof value.then !== 'function') {
        this.updateSearchBarDataList()
      }
    },
    currentlySelectedValue (value) {
      if (value == null) return null
      if (typeof value.then !== 'function') {
        this.propertyList = value.properties
        this.openPropertiesBar()
      }
    }
  },
  data () {
    return {
      directionsSettings: false,
      directionsBar: false,
      firstLocation: null,
      secondLocation: null,
      instructionList: [],
      instructionIndex: 0,
      searchBarDataList: null,
      searchBarDataListDetails: null,
      propertiesBar: false,
      propertyList: null,
      filterList: ['shop', 'wheelchair', 'no filter'],
      filterListOn: false
    }
  },
  methods: {
    async applyFilter (filterName) {
      const downloadedFilters = this.getDownloadedFilters

      let currentFilter = null

      downloadedFilters.forEach((filter) => {
        if (filterName === filter[0]) currentFilter = filter[1]
      })

      if (currentFilter === null) {
        await downloadedFilters.push(await downloadFilterData(this, filterName))
        currentFilter = downloadedFilters[downloadedFilters.length - 1]
      }

      this.$store.commit('setSelectedFilter', currentFilter)
    },
    closeProperties () {
      this.propertiesBar = !this.propertiesBar
      this.$store.commit('setSelectedValue', null)
    },
    updateSearchBarDataList () {
      if (this.getBaseData === null) return null

      const baseData = this.getBaseData.features
      const searchList = []
      const detailsList = []

      baseData.forEach((feature) => {
        if (feature.properties.name !== undefined) {
          searchList.push(feature.properties.name)
          detailsList.push(feature)
        }
      })

      this.searchBarDataList = searchList
      this.searchBarDataListDetails = detailsList
    },
    closeDirections () {
      this.directionsBar = !this.directionsBar
      this.instructionIndex = 0
      this.$store.commit('setCurrentRoute', null)
      this.$store.commit('setRouteMarkers', null)
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

      let searchValue = null

      this.searchBarDataListDetails.forEach((feature) => {
        if (feature.properties.name === search && feature.geometry.type === 'Polygon') searchValue = feature
      })

      this.$store.commit('setSelectedValue', searchValue)
      this.$store.commit('setLoadingState', false)
    },
    async locate () {
      if (this.firstLocation !== null && this.secondLocation !== null) {
        this.directionsSettings = false
        this.directionsBar = true

        let firstValue = null
        let secondValue = null

        this.searchBarDataListDetails.forEach((feature) => {
          if (feature.properties.name === this.firstLocation) firstValue = feature.geometry.coordinates[0][0]
          if (feature.properties.name === this.secondLocation) secondValue = feature.geometry.coordinates[0][0]
        })

        this.$store.commit('setCurrentRoute', await calculateRoute(this, firstValue, secondValue))

        const currentRoute = this.getCurrentRoute
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
    openSettingsWindow: function (event) {
      this.$store.commit('setSettingsPopupOpen', true)
    },
    openPropertiesBar () {
      this.propertiesBar = true
    }
  },
  mounted () {
    if (this.getLoadingState === false) {
      this.updateSearchBarDataList()
    }
  }
}
</script>

<style scoped>

</style>
