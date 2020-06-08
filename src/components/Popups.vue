<template>
  <div>
    <Settings @closeWindow="closeSettingsWindow" v-if="this.$store.getters.getSettingsWindowOpen === true"></Settings>
  </div>
</template>

<script>
import Settings from './Settings'

export default {
  name: 'Popups',
  components: {
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
