<template>
  <div v-if="!this.$store.getters.getLoadingState && this.$store.getters.getCurrentSearch != null">
    <div v-for="(mapFeature) in this.$store.getters.getCurrentSearch.features" :key="mapFeature.id">
      <div v-if="mapFeature.geometry.type === 'point'">
        <l-marker :lat-lng="[mapFeature.geometry.coordinates[1], mapFeature.geometry.coordinates[0]]">
          <l-popup>Lets try again</l-popup>
        </l-marker>
      </div>
      <div v-else>
        <l-geo-json :geojson=mapFeature>
          <l-popup>Lets try again</l-popup>
        </l-geo-json>
      </div>
    </div>
  </div>
</template>

<script>
import { LGeoJson, LMarker, LPopup } from 'vue2-leaflet'

export default {
  name: 'FeatureLayer',
  components: {
    LGeoJson, LMarker, LPopup
  }
}
</script>

<style scoped>

</style>
