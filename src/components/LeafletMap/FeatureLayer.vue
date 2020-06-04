<template>
  <div v-if="!this.$store.getters.getLoadingState">

    <div v-if="this.$store.getters.getSelectedValue !== null">
        <l-geo-json :lat-lngs="this.$store.getters.getSelectedValue.features"
                    :options=searchOptions></l-geo-json>
    </div>

    <div v-if="this.$store.getters.getCurrentRoute !== null">
      <l-geo-json :geojson="this.$store.getters.getCurrentRoute.features"
                  :options=routeOptions></l-geo-json>
    </div>

    <div v-if="this.$store.getters.getRouteMarkers !== null">
      <l-marker v-for="(marker) in this.$store.getters.getRouteMarkers"
                :lat-lng="marker"
                :key="marker.id"></l-marker>
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
      markers: [],
      baseOptions: {
        style: function (feature) {
          return {
          }
        },
        onEachFeature: function onEachFeature (feature, layer) {
          layer.on('click', function (e) {
            console.log(e)
          })
        }
      },
      searchOptions: {
        style: function (feature) {
          return {
            weight: 4,
            color: '#FF0000'
          }
        },
        onEachFeature: function onEachFeature (feature, layer) {
          if (feature.properties) {
            const str = JSON.stringify(feature.properties, null, 2)
            layer.bindPopup(str)
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
          if (feature.properties) {
            const str = JSON.stringify(feature.properties, null, 2)
            layer.bindPopup(str)
          }
        }
      }

    }
  }

}
</script>

<style scoped>

</style>
