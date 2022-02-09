<template>
  <q-page class="q-px-lg">
    <div>
      <div class="text-h5 text-capitalize q-pt-lg text-center">url shortener</div>
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
