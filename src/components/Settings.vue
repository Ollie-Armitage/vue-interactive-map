<template>
  <uForm @closeForm="closeWindow" :title="'Settings'">
    <v-card-text>
      <v-autocomplete ref="tilelayers" :items="Object.keys(tileLayers)" :search-input.sync="currentlySelected"></v-autocomplete>
      <v-card-actions>
        <v-btn large rounded dark color="#33384d" @click="updateSettings">Update Settings</v-btn>
      </v-card-actions>
    </v-card-text>
  </uForm>
</template>

<script>
import uForm from './uForm'

export default {
  name: 'Login',
  components: { uForm },
  data () {
    return {
      currentlySelected: null,
      tileLayers: {
        OpenStreetMaps: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
        OSMCycleMap: 'http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
        OSMBlackAndWhite: 'http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
        EsriImagery: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        EsriStreets: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
      }
    }
  },
  methods: {
    closeWindow: function (event) {
      this.$emit('closeWindow')
    },
    updateSettings: function (event) {
      let newLayer = null

      for (var key in this.tileLayers) {
        if (this.currentlySelected === key) {
          newLayer = this.tileLayers[key]
          console.log(key + ': ' + this.tileLayers[key])
        }
      }

      this.$store.commit('setCurrentTileLayer', newLayer)
    }
  }

}

</script>
