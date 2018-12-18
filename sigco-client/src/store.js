import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from './services/index'

const { service, FeathersVuex } = feathersVuex(feathersClient, { idField: 'id' })

Vue.use(Vuex)
Vue.use(FeathersVuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    service('neighbors'),
    service('visit-cards'),
    service('invoices')
  ]
})
