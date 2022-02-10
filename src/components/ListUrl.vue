<template>
  <div class="q-pt-md">
    <div class="text-center q-pt-md" style="text-decoration: underline">List of URLS</div>
    <div class="q-pt-xs flex justify-center">
      <template v-if="loadingUrls" class="q-mt-xl">
        <QSpinnerFacebook size="xl" color="primary" class="q-mt-xl" />
      </template>

      <template v-if="!loadingUrls && urlsList.length === 0">
        <div>
          <div class="flex flex-center q-mt-xl text-grey-6 text-h6">No Urls Shortened</div>
          </div>
      </template>

      <template v-if="!loadingUrls && urlsList.length > 0">
        <div>
        <q-list bordered separator class="full-width" style="max-width: 1200px" v-for="url in urlsList" :key="url._id">
          <q-item class="row">
            <q-item-section class="xs-hide sm-hide">
              <div style="width: 80%;  text-overflow: ellipsis;" class="col-lg-8 overflow-hidden ellipsis xs-hide sm-hide" :class="$q.screen.lt.md ? 'hidden' : ''">
                {{ url.longUrl }}
              </div>
              <q-tooltip>
                {{ momentTime(url.date).format('DD/mm hh:mm A') }}
              </q-tooltip>
            </q-item-section>

            <q-item-section :side="$q.screen.gt.xs" class="flex items-start" >
              <a :href="url.shortUrl" class="text-blue"  target="_blank" style="text-decoration: none">{{ url.shortUrl }}</a>
            </q-item-section>
            <q-space class="md-hide lg-hide xl-hide" />
            <q-item-section side :style="$q.screen.lt.md ? 'margin-left:202px' :''" class="q-ml-xl cursor-pointer">
              <q-icon name="content_copy" color="primary" @click="copy(url.shortUrl)" />
              <q-tooltip>
                Copy
              </q-tooltip>
            </q-item-section>
          </q-item>
        </q-list>
          </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, defineProps, onMounted, watch} from "vue";
import moment from 'moment'
import axios from 'axios'
import { copyToClipboard, openURL, QSpinnerFacebook, useQuasar } from 'quasar'
const baseAPI = 'http://localhost:5000'
    const props = defineProps({
      updateUrls: {
        type: Boolean,
        required: true
      }
    })

    const $q = useQuasar()
    let momentTime = ref(moment)
    let loadingUrls = ref(false)

    const urlsList = ref([])

    onMounted(() => {
      fetchUrls()
    })

    let final = computed(() => {
      return props.updateUrls
    })

    watch(final, (final) => {
      if (final === true) {
        fetchUrls()
      }
    })

    const emit = defineEmits(['resetProp', 'resetProp'])

    const fetchUrls = () => {
      loadingUrls.value = true
      axios.get(`${baseAPI}/api/url`)
        .then(response => {
          loadingUrls.value = false
          urlsList.value = response.data
          final = false
          emit('resetProp', 'resetProp')
        })
        .catch(error => {
          loadingUrls.value = false
      })
    }

    const copy = (text) => {
      copyToClipboard(text)
        .then(() => {
          $q.notify({
            message: 'Link Copied', position: 'center', color: 'primary', icon: 'check_circle',
            actions: [{ label: `Open`, color: 'white', handler: () => {openURL(text)}}]
          })
        })
        .catch((err) => {
          $q.notify({ message: err, position: 'center', color: 'red-5'})
        })
    }

</script>

<style scoped>

</style>
