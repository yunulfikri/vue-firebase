import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('../firebaseConfig')

Vue.use(Vuex)

fb.auth.onAuthStateChanged(user => {
  if(user){
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
      let postsArray = []
      querySnapshot.forEach(doc => {
        let post = doc.data()
        post.id = doc.id
        postsArray.push(post)
      })
      store.commit('setPosts', postsArray)
    })
  }
})

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    posts: []
  },
  mutations: {
    setCurrentUser(state, val){
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPosts(state, val){
      if(val){
        state.posts = val
      }else{
        state.posts = []
      }
      
    }

  },
  actions: {
    fetchUserProfile({ commit, state }){
      fb.usersCollection.doc(state.currentUser.uid).get()
      .then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    },
    clearData({ commit }){
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('setPosts', null)
    }
  },
  modules: {
  }
})
