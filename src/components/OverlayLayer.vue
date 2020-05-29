<template>
  <div>
    <ControlSearchBar @searched="newSearch" position="topleft"></ControlSearchBar>

    <ControlButton button-name="Settings" position="topright" @click="openSettingsWindow"
                   color="#33384d"></ControlButton>
    <ControlButton button-name="Display Shops" position="bottomleft" @click="newSearch('shop')"
                   color="#33384d"></ControlButton>
    <div v-if="this.LoggedInState() === false">
      <ControlButton button-name="Login" position="topright" @click="openLoginWindow" color="#33384d"></ControlButton>
    </div>
    <div v-else>
    </div>

  </div>
</template>

<script>
import { fetchTagValue } from '../services/overpass'

import ControlButton from './ControlLayers/controlButton'
import ControlSearchBar from './ControlLayers/ControlSearchBar'

export default {
  name: 'overlay-layer',
  data () {
    return {}
  },
  components: {
    ControlButton,
    ControlSearchBar
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
