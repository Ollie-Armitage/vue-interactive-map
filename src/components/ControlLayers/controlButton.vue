<template>
  <div>
    <l-control :position="position">
      <v-btn @click="click" dark :color=color>{{ buttonName }}</v-btn>
    </l-control>
  </div>
</template>

<script>
import { LControl } from 'vue2-leaflet'

export default {
  name: 'controlButton',
  props: ['color', 'position', 'buttonName'],
  components: {
    LControl
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

</style>
