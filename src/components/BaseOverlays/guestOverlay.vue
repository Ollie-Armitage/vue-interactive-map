<template>
  <div>
    <ControlSearchBar position="topleft"></ControlSearchBar>
    <ControlButton button-name="Login" position="topright" @click="openLoginWindow" color="#33384d"></ControlButton>
    <ControlButton button-name="Settings" position="topright" @click="openSettingsWindow" color="#33384d"></ControlButton>
    <ControlButton button-name="Display Shops" position="bottomleft" @click="openLoginWindow" color="#33384d"></ControlButton>
  </div>

</template>

<script>
import ControlButton from '../ControlLayers/controlButton'
import ControlSearchBar from '../ControlLayers/ControlSearchBar'

export default {
  name: 'guestOverlay',
  components: {
    ControlSearchBar,
    ControlButton
  },
  data () {
    return {
      loginWindowOpen: false
    }
  },
  methods: {
    openLoginWindow: function (event) {
      this.$store.commit('setLoginPopupOpen', true)
    },
    openSettingsWindow: function (event) {
      this.$store.commit('setSettingsPopupOpen', true)
    }
  }

}
</script>

<style scoped>

</style>
