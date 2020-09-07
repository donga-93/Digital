<template>
    <form class="auth-tabs" @submit.prevent="submitForm">
      <div class="row q-mb-md">
        <q-banner class="bg-grey-3 col">
          <template v-slot:avatar>
            <q-icon name="account_circle" color="primary" />
          </template>
          Log in
        </q-banner>
      </div>
      <div class="row q-mb-md">
        <q-input
          v-model="formData.username"
          label="Username"
          ref="username"
          :rules="[ val => val.length >= 4 || 'Please enter at least 6 characters']"
          lazy-rules
          outlined
          type="username"
          stack-label
          class="col"
        />
      </div>
      <div class="row q-mb-md">
        <q-input
          v-model="formData.password"
          label="Password"
          ref="password"
          :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
          lazy-rules
          outlined
          type="password"
          stack-label
          class="col"
        />
      </div>
      <div class="row">
        <q-space />
        <q-btn
          color="primary"
          label="Login"
          type="submit">
        </q-btn>
      </div>
    </form>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapState('account', ['status'])
        },

        created () {
            // reset login status
            this.logout();
        },  methods: {
            ...mapActions('account', ['login', 'logout']),
            submitForm() {
                this.$refs.username.validate()
                this.$refs.password.validate()
                const { username, password } = this.formData;
                console.log(username)
                if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
                    this.login({ username: this.formData.username, password: this.formData.password })
                }
            }
        }
    }
</script>

<style>
  .auth-tabs {
    max-width: 500px;
    margin: 20px;
  }
</style>
