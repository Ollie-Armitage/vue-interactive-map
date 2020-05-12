<template>
  <uForm @closeForm="closeWindow" :title = "'Settings'">
    <p>Not Implemented Yet.</p>
  </uForm>
</template>

<script>
import uForm from '../BaseTypes/uForm'

export default {
  name: 'Login',
  components: { uForm },
  data () {
    return {}
  },
  methods: {
    closeWindow: function (event) {
      this.$emit('closeWindow')
    }
  }

}

</script>
