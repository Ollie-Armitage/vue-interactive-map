<template>
  <div>
    <div v-if="!this.$store.getters.getLoadingState && this.$store.getters.getCurrentSearch != null">
      <l-geo-json :geojson="this.$store.getters.getCurrentSearch.features" :options = options></l-geo-json>
    </div>
    <div v-if="!this.$store.getters.getLoadingState && this.$store.getters.getCurrentRoute != null">
      <l-geo-json :geojson="this.$store.getters.getCurrentRoute.features" :options = options></l-geo-json>
    </div>
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
          // does this feature have a property named popupContent?

          console.log(feature)
          if (feature.properties) {
            const str = JSON.stringify(feature.properties, null, 2)
            layer.bindPopup('Properties: ' + str)
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
