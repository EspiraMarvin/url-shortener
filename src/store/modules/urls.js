import axios from "axios";

const baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : 'https://shorts-api.onrender.com'


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
  ADD_URL(context, payload) {
    const finalForm = {
      longUrl: payload.url
    }
    return new Promise((resolve, reject) => {
      axios.post(`${baseURL}/api/url/shorten`, payload)
        .then(response => {
          context.dispatch('FETCH_URLS')
          resolve(response)
        })
        .catch(error => {
          reject(error.response.data)
        })
    })
  },
  FETCH_URLS(context, payload) {
    context.commit('SET_FETCHING_URLS', true)
    return new Promise((resolve, reject) => {
      axios.get(`${baseURL}/api/url`)
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
  DELETE_URL(context, payload){
    const urlId = payload._id
    return new Promise((resolve, reject) => {
      axios.delete(`${baseURL}/api/url/${urlId}`)
        .then(response => {
          context.dispatch('FETCH_URLS')
          resolve(response)
        })
        .catch(error => reject(error))
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

