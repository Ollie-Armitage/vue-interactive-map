<template>
  <v-app>
    <InteractiveMap></InteractiveMap>
    <Overlay></Overlay>
    <Popups></Popups>
  </v-app>
</template>

<script>
import InteractiveMap from './components/LeafletMap/InteractiveMap'
import Popups from './components/Popups'
import Overlay from './components/Overlay'
import { mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    InteractiveMap,
    Popups,
    Overlay
  },
  data () {
    return {
      drawer: true
    }
  },
  methods: {
    ...mapActions(['downloadBaseData'])

  },
  async mounted () {
    this.$store.commit('setLoadingState', true)
    this.$store.commit('setBaseData', this.downloadBaseData())
    this.$store.commit('setLoadingState', false)
  }
}
</script>

<style>

</style>
