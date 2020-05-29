<template>
  <div class="map">
    <div class="row map position-absolute">
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
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <button @click="getData('shop')">Get Shops</button>
        <OverlayLayer class="baseOverlay"></OverlayLayer>

      </l-map>
    </div>
  </div>
</template>

<script>
import { latLngBounds, latLng } from 'leaflet'
import OverlayLayer from './OverlayLayer'
import { fetchTag } from '../services/overpass'

export default {
  name: 'InteractiveMap',
  components: {
    OverlayLayer
  },
  data () {
    return {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
      zoom: 16,
      center: [51.3781, -2.3268],
      maxBounds: latLngBounds(
        latLng(51.3823, -2.3372),
        latLng(51.3710, -2.3161)
      ),
      bounds: latLngBounds(
        latLng(51.3823, -2.3372),
        latLng(51.3710, -2.3161)
      ),
      maxZoom: 18,
      minZoom: 16,
      mapData: null
    }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    getData (dataType) {
      this.mapData = fetchTag(this, 'shop')
    }
  }
}

</script>

<style scoped lang="scss">
  .map {
    height: 100vh;
    width: 99vw;
    padding-left: 10px;
    z-index: 0;
  }
</style>
