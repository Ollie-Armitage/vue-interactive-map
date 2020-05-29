<template>
  <div>

    <v-autocomplete @keydown.enter ="newSearch($event.target.value)" outlined background-color="white" style="z-index: 1001; width:30%; margin: 20px"></v-autocomplete>

    <v-bottom-navigation
      background-color="#33384d"
      dark
      fixed
      grow
      style="z-index: 1001"
    >
      <v-btn @click="openLoginWindow">
        <span>Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn @click="openSettingsWindow">
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

export default {
  name: 'overlay-layer',
  data () {
    return {}
  },
  components: {
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
