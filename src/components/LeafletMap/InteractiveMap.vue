<template>
  <div class="map">

    <div class="map position-absolute">
      <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        :bounds="bounds"
        :maxBounds="maxBounds"
        :maxZoom="maxZoom"
        :minZoom="minZoom"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
        :options="{
          zoomControl:false,
          attributionControl: false
        }"
        @click="mapClick"
      >
        <l-tile-layer :url="this.getTileLayer()"></l-tile-layer>
        <FeatureLayer></FeatureLayer>
      </l-map>
    </div>
  </div>
</template>

<script>
import { latLngBounds, latLng } from 'leaflet'
import FeatureLayer from './FeatureLayer'
import { mapGetters } from 'vuex'

export default {
  name: 'InteractiveMap',
  components: {
    FeatureLayer
  },
  data () {
    return {
      zoom: 18,
      maxZoom: 18,
      minZoom: 16,
      center: [51.3781, -2.3268],
      maxBounds: latLngBounds(
        latLng(51.368091901418, -2.3417186737061),
        latLng(51.386111062521, -2.3105192184448)
      ),
      bounds: latLngBounds(
        latLng(51.368091901418, -2.3417186737061),
        latLng(51.386111062521, -2.3105192184448)
      )
    }
  },
  methods: {
    ...mapGetters(['getTileLayer']),
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    async mapClick (event) {
      // const latlng = event.latlng
    }
  }
}

</script>

<style>
  html, body, .map {
    height: 100vh;
    width: 100vw;
    z-index: 0;
  }
</style>
