<template>
  <div class="q-pt-md">
    <div class="text-center q-pt-md" style="text-decoration: underline">List of URLS</div>
    <div class="q-pt-xs flex justify-center">
      <template v-if="fetchingUrls" class="q-mt-xl">
        <q-list  class="full-width" style="max-width: 1200px"  square v-for="(n, index) in 5" :key="index">
          <q-skeleton  square class="full-width q-mt-xs" style="max-width: 1200px" height="40px"/>
        </q-list>
      </template>

      <template v-if="!fetchingUrls && urlsList.length === 0">
        <div class="flex flex-center q-mt-xl text-grey-6 text-h6">No Urls Shortened</div>
      </template>

      <template v-if="!fetchingUrls && urlsList.length > 0">
        <q-list bordered separator class="full-width" style="max-width: 1200px" v-for="url in urlsList" :key="url._id">
          <q-item class="row">
            <q-item-section class="xs-hide sm-hide">
              <div style="width: 80%;  text-overflow: ellipsis;" class="col-lg-8 overflow-hidden ellipsis xs-hide sm-hide" :class="$q.screen.lt.md ? 'hidden' : ''">
                {{ url.longUrl }}
              </div>
              <q-tooltip>
                {{ moment(url.date).format('DD/mm hh:mm A') }}
              </q-tooltip>
            </q-item-section>

            <q-item-section :side="$q.screen.gt.xs" class="flex items-start" >
              <a :href="url.shortUrl" class="text-blue"  target="_blank" style="text-decoration: none">{{ url.shortUrl }}</a>
            </q-item-section>
            <q-space class="md-hide lg-hide xl-hide" />
            <q-item-section side :style="$q.screen.lt.md ? 'margin-left:202px' :''" class="q-ml-xl">
              <q-icon name="content_copy" color="primary" @click="copy(url.shortUrl)" />
              <q-tooltip>
                Copy
              </q-tooltip>
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </div>
  </div>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { openURL } from 'quasar'
import utils from 'src/helpers/utils'
import moment from 'moment'
export default {
  name: "ListUrl",
  data() {
    return {...utils, moment:moment}
  },
  mounted() {
    this.$store.dispatch('urls/FETCH_URLS')
  },
  methods: {
    copy(text){
      copyToClipboard(text)
        .then(() => {
          this.$q.notify({
            message: 'Link Copied', position: 'center', color: 'primary', icon: 'check_circle',
            actions: [{ label: `Open`, color: 'white', handler: () => {openURL(text)}}]
            })
        })
        .catch((err) => {
          this.$q.notify({ message: err, position: 'center', color: 'red-5'})
        })
    }
  },
  computed: {
    urlsList() {
      return this.$store.getters['urls/GET_URLS']
    },
    fetchingUrls() {
      return this.$store.getters['urls/GET_FETCHING_URLS']
    }
  }
}
</script>

<style scoped>

</style>
