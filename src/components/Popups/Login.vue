<template>
  <uForm @closeForm="closeWindow" :title = "'University Login'">
    <v-card-text>
      <v-text-field name="userName" label="Login" type="text"></v-text-field>
      <v-text-field single-line name="password" label="Password" type="password"></v-text-field>
      <v-card-actions>
        <v-btn x-small rounded>Can't Login?</v-btn>
        <v-spacer></v-spacer>
        <v-btn large rounded dark color="#33384d">Login</v-btn>
      </v-card-actions>
    </v-card-text>
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
