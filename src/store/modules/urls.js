import axios from "axios";

const clientAPI = 'http://localhost:5000/api/url/shorten'

const state = () => ({
  urls: [],
  fetchingUrls: false
})

const getters = {
  GET_URLS: state => state.urls,
  GET_FETCHING_URLS: state => state.fetchingUrls
}

const mutations = {
  SET_URLS(state, data) {
    state.urls = data
  },
  SET_FETCHING_URLS(state, data) {
    state.fetchingUrls = data
  }
}

const actions = {
  FETCH_URLS(context, payload) {
    context.commit('SET_FETCHING_URLS', true)
    return new Promise((resolve, reject) => {
      axios.get(`${clientAPI}`)
        .then(response => {
          context.commit('SET_FETCHING_URLS', false)
          context.commit('SET_URLS', response.data)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_FETCHING_URLS', false)
          reject(error)
        })
    })
  },
  ADD_URL(context, payload) {
    console.log('payload', payload)
    return new Promise((resolve, reject) => {
      axios.post(`${clientAPI}`, payload)
        .then(response => {
          console.log('response at add comp at store', response)
          console.log('response data at add comp at store', response.data)
          context.dispatch('FETCH_URLS')
          resolve(response)
        })
        .catch(error => {
          console.log('error at add comp at store', error)
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

