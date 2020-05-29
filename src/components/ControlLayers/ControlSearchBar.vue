<template>
  <div>
    <l-control :position="position">
        <v-autocomplete @keydown.enter = "$emit('searched', $event.target.value)" background-color="white" cache-items dense></v-autocomplete>
    </l-control>
  </div>

</template>

<script>
import { LControl } from 'vue2-leaflet'
export default {
  name: 'ControlSearchBar',
  props: ['position'],
  components: {
    LControl
  }
}
</script>

<style scoped>

</style>
