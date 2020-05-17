<template>
  <v-app>
    <InteractiveMap></InteractiveMap>
    <Popups></Popups>

  </v-app>
</template>

<script>
import InteractiveMap from './components/InteractiveMap'
import Popups from './components/Popups'

export default {
  name: 'App',

  components: {
    InteractiveMap,
    Popups
  },
  methods: {
    fetchOverpassData: function (query) {
      const overpassLink = 'https://overpass-api.de/api/interpreter?data='
      const fullLink = overpassLink + query

      this.$http.get(fullLink).then(response => {
        console.log('Obtained OSM data through Overpass query: ' + query)
        return response.json()
      }).then(data => {
        this.$store.commit('setMapData', data)
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>
</style>
