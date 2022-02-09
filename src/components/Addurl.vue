<template>
  <div class="q-mt-xl flex justify-center">
    <q-form ref="addUrlForm" class="full-width" style="max-width: 500px" @submit="submitUrl">
      <q-input
        outlined
        v-model="urlForm.url"
        stack-label
        label="Add URL"
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Enter URL']"
      />
      <q-btn
        @click="submitUrl"
        :loading="loading"
        label="Submit" class="q-mt-sm full-width" unelevated color="primary" no-caps
      >
        <template v-slot:loading><q-spinner-facebook  /></template>
      </q-btn>
    </q-form>
  </div>
</template>

<script>
import utils from 'src/helpers/utils'
export default {
  name: "Addurl",
  data() {
    return {
      ...utils,
      urlForm: {
        url: ''
      },
      loading: false
    }
  },
  methods: {
    submitUrl() {
      this.$refs.addUrlForm.validate().then(success => {
        if (success){
          this.loading = true
          this.$store.dispatch('urls/ADD_URL', this.urlForm)
            .then(response => {
              this.loading = false
              this.urlForm = {}
            }).catch(error => {
            this.loading = false
            this.$q.notify({ message: error, position: 'bottom', color: 'red-5', icon: 'error'})
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
