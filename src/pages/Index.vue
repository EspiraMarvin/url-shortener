<template>
  <q-page class="q-px-lg">
      <div class="text-h5 text-capitalize q-pt-lg text-center">url shortener</div>
      <AddUrl @toParent="toParent" />
      <ListUrl :updateUrls="updateUrls" @resetProp="resetProp" />
  </q-page>
</template>

<script>
import {ref, defineComponent, defineProps } from "vue";
import AddUrl from "components/AddUrl";
import ListUrl from "components/ListUrl";

export default defineComponent({
  name: "PageIndex",
  components: { AddUrl, ListUrl },
  setup() {
    let updateUrls = ref(false)

    const toParent = (val) => {
      if (val === 'updateUrls') {
        updateUrls.value = true
      }
    }

    const resetProp = (val) => {
      updateUrls.value = false
    }

    return {
      toParent,
      resetProp,
      updateUrls
    }
  }
});
</script>
