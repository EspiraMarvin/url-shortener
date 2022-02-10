<template>
  <router-view />
</template>
<script>
import {defineComponent, inject} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const store = inject('store')
    return {
      store
    }
  }
});
</script>
