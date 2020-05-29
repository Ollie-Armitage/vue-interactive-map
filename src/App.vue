<template>
  <v-app>
    <InteractiveMap></InteractiveMap>
    <Popups></Popups>
  </v-app>
</template>

<script>
import InteractiveMap from './components/InteractiveMap'
import Popups from './components/Popups'

export default {
  name: 'App',

  components: {
    InteractiveMap,
    Popups
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
