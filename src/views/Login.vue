<template>
  <div id="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <section>
      <div class="col1">
        <h1>Yo App</h1>
        <p>Welcome babes Build this project by checking out The Definitive Guide to Getting Started with Vue.js</p>
      </div>
      <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword}">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <label for="email1">Email</label>
          <input type="text" v-model.trim="loginForm.email" placeholder="you@email.com" id="email1" />

          <label for="password1">Password</label>
          <input type="password" v-model.trim="loginForm.password" placeholder="******" id="password1" />

          <button @click="login" class="button">Log In</button>

          <div class="extras">
            <a @click="togglePasswordReset">Forgot Password</a>
            <a @click="toggle">Create an Account</a>
          </div>
        </form>
        <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Get Started</h1>

          <label for="name">Name</label>
          <input v-model.trim="signupForm.name" type="text" placeholder="Your name" id="name" />

          <label for="title">Title</label>
          <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />

          <label for="email2">Email</label>
          <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />

          <label for="password2">Password</label>
          <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />

          <button @click="signup" class="button">Sign Up</button>

          <div class="extras">
            <a @click="toggle">Back to Log In</a>
          </div>
        </form>
        <form v-if="showForgotPassword" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Password Reset</h1>
            <p>we will send your reset instruction email</p>
            <input type="email" v-model.trim="passwordForm.email" placeholder="example@email.com" id="email3">
            <button @click="resetPassword" class="button">Submit</button>
            <div class="extras">
              <a @click="togglePasswordReset">Back to login</a>
            </div>
          </div>
          <div v-else>
            <h1>Email send</h1>
            <p>check your email for instruction passoword reset</p>
            <a @click="togglePasswordReset" class="button">Back to login</a>
          </div>
        </form>
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
  const fb = require('../firebaseConfig.js');
  export default {
    data() {
      return {
        loginForm: {
          email: '',
          password: ''
        },
        signupForm: {
          name: '',
          title: '',
          email: '',
          password: ''
        },
        passwordForm: {
            email: ''
        },
        showLoginForm: true,
        showForgotPassword: false,
        passwordResetSuccess: false,
        performingRequest: false,
        errorMsg: ''
      }
    },
    methods: {
      toggle() {
        this.errorMsg = ''
        this.showLoginForm = !this.showLoginForm
      },
      login() {
        this.performingRequest = true
        fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.performingRequest = false
          this.$router.push('/dashboard')
        }).catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
      },
      signup() {
        this.performingRequest = true

        fb.auth.createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        ).then(user => {
          this.$store.commit('setCurrentUser', user.user)

          //create collection db
          fb.usersCollection.doc(user.user.uid).set({
            name: this.signupForm.name,
            title: this.signupForm.title
          }).then(() => {
            this.$store.dispatch('fetchUserProfile')
            this.performingRequest = false
            this.$router.push('/dashboard')
          }).catch(err => {
            console.log(err)
            this.performingRequest = false
          })
        })

      },
      resetPassword(){
        this.performingRequest = true
        fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
          this.performingRequest = false
          this.passwordResetSuccess = true
          this.passwordForm.email = ''

        }).catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
      },
      togglePasswordReset() {
          if (this.showForgotPassword) {
              this.showLoginForm = true
              this.showForgotPassword = false
              this.passwordResetSuccess = false
          } else {
              this.showLoginForm = false
              this.showForgotPassword = true
          }
      },
    }
  }
</script>