<template>
  <q-page class="flex justify-center">
    <div>
      <div class="text-h5 text-capitalize q-mt-xl">url shortener</div>
      <Addurl />
      <ListUrl />
    </div>
  </q-page>
</template>

<script>
import Addurl from "components/Addurl";
import ListUrl from "components/ListUrl";
export default {
  name: 'PageIndex',
  components: { Addurl, ListUrl }
}
</script>
