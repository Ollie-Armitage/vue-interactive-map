<template>
  <div>

    <div v-if="this.getBaseLoading() === false">
      <div v-if="this.getBaseData() !== null">
        <l-geo-json :geojson="this.getBaseData()"
                    :options=baseOptions></l-geo-json>
      </div>
    </div>

    <div v-if="this.getFilterLoading() === false">
      <div v-if="this.getSelectedFilter() !== null">
        <l-geo-json :geojson="this.getSelectedFilter()"
                    :options=filterOptions></l-geo-json>
      </div>
    </div>

    <div v-if="this.getLoadingState() === false">
      <div v-if="this.getSelectedValue() !== null">
        <l-geo-json :geojson="this.getSelectedValue()"
                    :options=selectedOptions></l-geo-json>
      </div>

      <div v-if="this.getCurrentRoute() !== null">
        <l-geo-json :geojson="this.getCurrentRoute()"
                    :options=routeOptions></l-geo-json>
      </div>

      <div v-if="this.getRouteMarkers() !== null">
        <l-marker v-for="(marker) in this.getRouteMarkers()"
                  :lat-lng="marker"
                  :key="marker.id"></l-marker>
      </div>

    </div>
  </div>

</template>

<script>
import { LGeoJson } from 'vue2-leaflet'
import { mapGetters } from 'vuex'

export default {
  name: 'FeatureLayer',
  components: {
    LGeoJson
  },
  methods: {
    ...mapGetters(['getSelectedValue', 'getCurrentRoute', 'getRouteMarkers', 'getLoadingState', 'getBaseData', 'getBaseLoading', 'getFilterLoading', 'getSelectedFilter']),
    onEachFeatureFunction (app) {
      return function onEachFeature (feature, layer) {
        layer.on('click', function (event) {
          // console.log(event.target.feature)
          app.$store.commit('setSelectedValue', event.target.feature)
        })
      }
    }
  },
  data () {
    return {
      markers: [],
      baseOptions: {
        style: function (feature) {
          return {
            weight: 0,
            fillOpacity: 0
          }
        },
        filter: function (feature) {
          return feature.geometry.type !== 'Point'
        },
        onEachFeature: this.onEachFeatureFunction(this)
      },
      filterOptions: {
        style: function (feature) {
          return {
            weight: 4,
            color: '#2a5bdb'
          }
        },
        filter: function (feature) {
          return feature.geometry.type !== 'Point'
        },
        onEachFeature: this.onEachFeatureFunction(this)
      },
      selectedOptions: {
        style: function (feature) {
          return {
            weight: 4,
            color: '#FF0000'
          }
        }
      },
      routeOptions: {
        style: function (feature) {
          return {
            weight: 4,
            color: '#33384d'
          }
        }
      }

    }
  }

}
</script>

<style scoped>

</style>
