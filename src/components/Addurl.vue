<template>
  <div class="q-mt-xl">
    <q-form ref="addUrlForm" class="full-width">
      <q-input
        outlined
        v-model="urlForm.url"
        stack-label
        label="Add URL"
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Enter URL', hasWhiteSpacesOnly]"
      />
      <q-btn
        @click="submitUrl"
        :loading="loading"
        label="Submit" class="q-mt-md" unelevated color="primary"
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
    async submitUrl() {
      let success = await this.$refs.addUrlForm.validate()
      if (success) {
        this.loading = true

      }

    }
  }
}
</script>

<style scoped>

</style>
