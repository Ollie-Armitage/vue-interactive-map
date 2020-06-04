<template>
  <v-container id="container" fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form>
          <v-overlay :absolute=false :dark="false">
            <v-card id="logbox" class="elevation-12">
              <v-toolbar dark color="#33384d">
                <v-row>
                  <v-col class="d-flex justify-start">
                    <div v-if="title !== null"><v-toolbar-title>{{ title }}</v-toolbar-title></div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex justify-end">
                    <v-btn rounded @click="closeForm">
                      <v-icon dark>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-toolbar>
              <slot></slot>
            </v-card>
          </v-overlay>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'uForm',
  props: ['title'],
  methods: {
    closeForm () {
      this.$emit('closeForm')
    }
  }
}
</script>

<style scoped>
  #logbox {
    min-width: 350px;
  }

  @media only screen and (max-width: 768px) {
    #logbox {
      width: 100vw;
    }
  }
</style>
