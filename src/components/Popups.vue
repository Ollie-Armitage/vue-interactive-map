<template>
  <div>
    <Login @closeWindow="closeLoginWindow" v-if="this.$store.getters.getLoginWindowOpen === true"></Login>
    <Settings @closeWindow="closeSettingsWindow" v-if="this.$store.getters.getSettingsWindowOpen === true"></Settings>
  </div>
</template>

<script>
import Login from './Popups/Login'
import Settings from './Popups/Settings'

export default {
  name: 'Popups',
  components: {
    Login,
    Settings
  },
  methods: {
    closeLoginWindow () {
      this.$store.commit('setLoginPopupOpen', false)
    },
    closeSettingsWindow () {
      this.$store.commit('setSettingsPopupOpen', false)
    }
  }
}
</script>

<style scoped>

</style>
