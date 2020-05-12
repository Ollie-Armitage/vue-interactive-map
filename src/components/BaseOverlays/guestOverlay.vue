<template>
  <div>
    <ControlSearchBar position="topleft"></ControlSearchBar>
    <ControlButton button-name="Login" position="topright" @click="openLoginWindow" color="#33384d"></ControlButton>
    <ControlButton button-name="Settings" position="topright" @click="openSettingsWindow" color="#33384d"></ControlButton>
    <ControlInfoBox box-name="Testbox" position="bottomright" topcolor="#33384d">Some important info</ControlInfoBox>
    <ControlButton button-name="Display Shops" position="bottomleft" @click="openLoginWindow" color="#33384d"></ControlButton>

  </div>

</template>

<script>
import ControlButton from '../ControlLayers/controlButton'
import ControlInfoBox from '../ControlLayers/controlInfoBox'
import ControlSearchBar from '../ControlLayers/ControlSearchBar'

export default {
  name: 'guestOverlay',
  components: {
    ControlSearchBar,
    ControlButton,
    ControlInfoBox
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
