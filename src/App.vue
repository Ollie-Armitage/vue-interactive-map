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
import { fetchBaseData } from './services/overpass'

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
  methods: {},
  async beforeMount () {
    this.$store.commit('setLoadingState', true)
    this.$store.commit('setBaseData', await fetchBaseData(this))
    this.$store.commit('')
    this.$store.commit('setLoadingState', false)
  }
}
</script>

<style>

</style>
