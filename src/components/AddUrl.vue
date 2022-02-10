<template>
  <div class="q-mt-xl flex justify-center">
    <q-form ref="addUrlFormRef" class="full-width" style="max-width: 500px" @submit="submitUrl">
      <q-input
        outlined
        v-model="formUrl.url"
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

<script setup>
import {defineComponent, ref, inject, reactive, computed, onMounted} from "vue";
import axios from "axios";
import { useQuasar } from 'quasar'

    const baseAPI = 'http://localhost:5000'
    const addUrlFormRef = ref(null)
    let loading = ref(false)
    const $q = useQuasar()
    const url = ref('espira')
    const formUrl = reactive({
      url: ''
    })

    const emit = defineEmits(['toParent', 'updateUrls'])

    const submitUrl = async () => {
     let success = await addUrlFormRef.value.validate()
        if (success) {
          loading.value = true
          const finalForm = {
            url: formUrl.url
          }
          axios.post(`${baseAPI}/api/url/shorten`, finalForm)
            .then(response => {
              formUrl.url = ''
              loading.value = false
              emit('toParent', 'updateUrls')
            })
            .catch(error => {
              loading.value = false
              $q.notify({ message: error.response.data, position: 'bottom', color: 'red-5', icon: 'error'})
            })
        }
    }
</script>

<style scoped>

</style>
