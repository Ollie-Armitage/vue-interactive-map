<template>
  <div>
    <l-control :position="position">
      <v-container id="container" fill-height >
        <v-layout align-center justify-center>
          <v-flex>
                <v-alert border="top" colored-border :color="topcolor" class="elevation-12 multi-line">
                  <div style="word-wrap: break-word; max-width: 400px;">
                      <slot></slot>
                  </div>
                </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </l-control>
  </div>
</template>

<script>
import { LControl } from 'vue2-leaflet'

export default {
  name: 'controlInfoBox',
  props: ['color', 'position', 'boxName', 'topcolor'],
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
  .multi-line {
    white-space: pre-line;
  }
</style>
