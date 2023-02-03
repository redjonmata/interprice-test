<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.js'

import { mapGetters, mapActions } from 'vuex'
import types from './store/modules/table/types'
import moment from 'moment'
import _ from 'lodash'

window.mapGetters = mapGetters
window.mapActions = mapActions

window.types = types
window._ = _

window.moment = moment

export default {
  name: 'App'
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
