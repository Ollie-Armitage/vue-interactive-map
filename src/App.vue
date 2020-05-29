<template>
  <v-app>
    <button @click="getData">Get data</button>
    <InteractiveMap></InteractiveMap>
    <Popups></Popups>
  </v-app>
</template>

<script>
import InteractiveMap from './components/InteractiveMap'
import Popups from './components/Popups'
import { fetchOverpassData } from './services/overpass'

export default {
  name: 'App',

  components: {
    InteractiveMap,
    Popups
  },
  methods: {
    getData () {
      fetchOverpassData(this,
        'way(51.372265237935,-2.3359036445618,51.382535507549,-2.3177890777588);(._;>;);out;')
    }
  }
}
</script>

<style scoped>
</style>
