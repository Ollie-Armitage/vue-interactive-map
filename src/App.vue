<template>
  <v-app>
    <InteractiveMap></InteractiveMap>
    <Popups></Popups>
    <Overlay></Overlay>
  </v-app>
</template>

<script>
import InteractiveMap from './components/InteractiveMap'
import Popups from './components/Popups'
import Overlay from './components/Overlay'

export default {
  name: 'App',

  components: {
    InteractiveMap,
    Popups,
    Overlay
  },
  data () {
    return {
      drawer: true
    }
  },
  methods: {}
}
</script>

<style>

</style>
