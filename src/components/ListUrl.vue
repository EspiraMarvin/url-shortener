<template>
  <div class="q-pt-md">
    <div class="text-center q-pt-md " style="text-decoration: underline;font-weight: bold; font-size:20px">Shortened URL List </div>
    <div class="q-pt-xl flex justify-center">
      <template v-if="fetchingUrls && urlsList.length === 0" class="q-mt-xl">
        <q-spinner-facebook color="primary" class="q-mt-xl" size="xl"/>
      </template>


      <template v-if="fetchingUrls && urlsList.slice(0, urlsList.length-2).length === 0 && urlsList.length !== 0">
        <div class="flex flex-center q-mt-xs text-grey-6 text-h6" style="font-weight: lighter;">
        <q-spinner-facebook color="primary" class="q-mt-xs" size="md"/>
          </div>
      </template>

      <template v-if="!fetchingUrls && urlsList.slice(0, urlsList.length-2).length === 0 && urlsList.length !== 0">
        <div class="flex flex-center q-mt-xl text-grey-6 text-h6" style="font-weight: lighter;">No Urls Shortened</div>
      </template>


      <template v-if="urlsList.length > 0">

        <q-list bordered separator class="q-mb-xs full-width " style="max-width: 1200px" v-for="url in urlsList.slice(0, urlsList.length-2)" :key="url._id">
          <q-item class="row">
            <div class="md-hide lg-hide xl-hide flex flex-center cursor-pointer" @click="deleteUrl(url)">
              X
            </div>
            <q-item-section class="xs-hide sm-hide">
              <div style="width: 80%;  text-overflow: ellipsis;" class="col-lg-8 overflow-hidden ellipsis xs-hide sm-hide" :class="$q.screen.lt.md ? 'hidden' : ''">
                <span @click="deleteUrl(url)" class="q-px-md cursor-pointer">X</span>{{ url.longUrl }}
              </div>
              <q-tooltip>
                {{ moment(url.date).format('DD/mm hh:mm A') }}
              </q-tooltip>
            </q-item-section>

            <q-item-section :side="$q.screen.gt.xs" class="flex items-start" >
              <a :href="url.shortUrl" class="text-blue"  target="_blank" style="text-decoration: none">{{ url.shortUrl }}</a>
            </q-item-section>
            <q-space class="md-hide lg-hide xl-hide" />
            <q-item-section side :style="$q.screen.lt.md ? '' :''" class="q-ml-xl cursor-pointer">
              <q-icon name="content_copy" color="primary" @click="copy(url.shortUrl)" />
              <q-tooltip>
                Copy
              </q-tooltip>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="xs-hide q-mt-md full-width q-mb-xl"  style="max-width: 1200px; position:absolute; bottom: 0" >
        <div class="flex q-mt-md flex-center" style="text-decoration: underline">Sample</div>
        <q-list bordered separator class="q-mb-xs" style="max-width: 1200px" v-for="url in urlsList.slice(urlsList.length-2)" :key="url._id">
          <q-item class="row bg-grey-8 text-white">
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
            <q-item-section side :style="$q.screen.lt.md ? '' :''" class="q-ml-xl cursor-pointer">
              <q-icon name="content_copy" color="primary" @click="copy(url.shortUrl)" />
              <q-tooltip>
                Copy
              </q-tooltip>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <footer style="position: absolute; bottom: 0" class="q-my-md">Created by <a href="https://www.linkedin.com/in/marvin-espira/" target="_blank">Marvin Espira</a></footer>

      </template>
    </div>
  </div>

</template>

<script>
import { copyToClipboard, openURL } from 'quasar'
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
    },
    async deleteUrl(url) {
      try {
        const response = await this.$store.dispatch('urls/DELETE_URL', url)
        if (response) return
        //  this.$q.notify({ message: 'Link Deleted', position: 'center', color: 'red-5'})
      }
      catch(err) {
        this.$q.notify({ message: err.message, position: 'center', color: 'red-5'})
      }
    },
    async clearAllUrls() {
      try {
        const response = await this.$store.dispatch('urls/DELETE_ALL_URLS', this.urlsList)
        if (response) return this.$q.notify({ message: 'ALL Cleared', position: 'center', color: 'red-5'})
      }
      catch(err) {
        this.$q.notify({ message: err.message, position: 'center', color: 'red-5'})
      }
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
