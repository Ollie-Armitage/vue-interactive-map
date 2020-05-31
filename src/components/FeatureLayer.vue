<template>
  <div>
    <div v-if="!this.$store.getters.getLoadingState && this.$store.getters.getCurrentSearch != null">
      <l-geo-json :geojson="this.$store.getters.getCurrentSearch.features" :options=options></l-geo-json>
    </div>
    <div v-if="!this.$store.getters.getLoadingState && this.$store.getters.getCurrentRoute != null">
      <l-geo-json :geojson="this.$store.getters.getCurrentRoute.features" :options=routeOptions></l-geo-json>
    </div>
    <l-marker v-for="marker in markers" :lat-lng="marker" :key="marker"></l-marker>
  </div>

</template>

<script>
import { LGeoJson } from 'vue2-leaflet'

export default {
  name: 'FeatureLayer',
  components: {
    LGeoJson
  },
  data () {
    return {
      markers: [],
      options: {
        style: function (feature) {
          if (feature.properties.in_port) {
            return {
              weight: 4,
              color: '#00FF00'
            }
          } else {
            return {
              weight: 4,
              color: '#FF0000'
            }
          }
        },
        onEachFeature: function onEachFeature (feature, layer) {
          if (feature.properties) {
            const str = JSON.stringify(feature.properties, null, 2)
            layer.bindPopup('Properties: ' + str)
          }
        }
      },
      routeOptions: {
        style: function (feature) {
          return {
            weight: 4,
            color: '#33384d'
          }
        },
        onEachFeature: function onEachFeature (feature, layer) {
          this.markers.push(feature.geometry.coordinates[0])
        }
      }

    }
  }
}
</script>

<style scoped>

</style>
