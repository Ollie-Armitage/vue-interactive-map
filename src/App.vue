<template>
  <v-app>
    <InteractiveMap></InteractiveMap>
    <Popups></Popups>
    <Overlay></Overlay>
  </v-app>
</template>

<script>
import InteractiveMap from './components/LeafletMap/InteractiveMap'
import Popups from './components/Popups'
import Overlay from './components/Overlay'
import { downloadBaseData } from './services/overpass'

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
  async created () {
    const baseData = await downloadBaseData(this)
    this.$store.commit('setLoadingState', true)
    this.$store.commit('setBaseLayer', baseData)
    this.$store.commit('setLoadingState', false)
  }
}
</script>

<style>

</style>
