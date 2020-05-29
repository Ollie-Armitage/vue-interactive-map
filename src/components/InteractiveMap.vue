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
        <button @click="showHere = true">Put shops on map</button>
        <div v-if="showHere === true">
          <div v-for="(mapFeature) in mapData.features" :key="mapFeature">
            <l-marker :lat-lng="[mapFeature.geometry.coordinates[1], mapFeature.geometry.coordinates[0]]">
            </l-marker>
          </div>
        </div>

        <OverlayLayer class="baseOverlay"></OverlayLayer>

      </l-map>
    </div>
  </div>
</template>

<script>
import { latLngBounds, latLng } from 'leaflet'
import OverlayLayer from './OverlayLayer'
import { fetchTag } from '../services/overpass'
import { LMarker } from 'vue2-leaflet'

export default {
  name: 'InteractiveMap',
  components: {
    OverlayLayer,
    LMarker
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
      mapData: null,
      showHere: false
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
    async getData (dataType) {
      this.mapData = await fetchTag(this, dataType).then(value => {
        return value
      })
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
