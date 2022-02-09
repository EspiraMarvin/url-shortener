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
        url: 'https://www.amazon.com/SAMSUNG-65-Inch-Crystal-AU8000-Built/dp/B08Z25BH33/ref=sr_1_4?field-shipping_option-bin=3242350011&pf_rd_i=16225009011&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=85a9188d-dbd5-424e-9512-339a1227d37c&pf_rd_r=YB4R11NKJCTZA0D74VS5&pf_rd_s=merchandised-search-5&pf_rd_t=101&qid=1644397449&rnid=1266092011&s=electronics&sr=1-4'
      },
      loading: false
    }
  },
  methods: {
    submitUrl() {
      console.log('submitUrl clicked')
      this.$refs.addUrlForm.validate().then(success => {
        if (success){
          console.log('form success')
          this.loading = true
          this.$store.dispatch('urls/ADD_URL', this.urlForm)
            .then(response => {
              this.loading = false
              this.urlForm.url = ''
              console.log('response at add comp', response)
            }).catch(error => {
            this.loading = false
            console.log('error at add comp', error)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
