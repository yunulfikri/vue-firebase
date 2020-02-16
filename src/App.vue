<template>
  <div id="app">
    <Navigation v-if="currentUser"></Navigation>
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 0px
</style>

<script>
import { mapState } from 'vuex'
import Navigation from './components/Navigation'

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
