<template>
  <div>
    <div v-if="this.LoggedInState() === false">
      <guest-overlay></guest-overlay>
    </div>
    <div v-else>
      <div>Logged</div>
    </div>
  </div>
</template>

<script>
import GuestOverlay from './BaseOverlays/guestOverlay'

export default {
  name: 'overlay-layer',
  data () {
    return {
    }
  },
  components: {
    GuestOverlay
  },
  methods: {
    LoggedInState () {
      return this.$store.getters.getLoggedIn
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
