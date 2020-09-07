<template>
  <q-page class="flex flex-center">
        <q-btn style="position: absolute; top: 2px; right: 2px;"  color="red" @click="userlogout">
          Logout
        </q-btn>



    <div style="position: absolute; top: 50px;" class="absolute-left">
      <div class="item two-lines">
        <img class="item-primary" src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg">
        <div class="item-content">
          <h1 style="color: chartreuse">Hi {{account.user.firstName}}!</h1>
          <h2 style="color: darkorange">Web developer</h2>
          <h2 style="color: lightblue">Welcome to Logged in :)</h2>
        </div>
      </div>
    </div>



  </q-page>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        data () {
            return {
                loading: false
            }
        },
        methods: {
            ...mapActions('account', ['login', 'logout']),
            userlogout () {
                this.logout()
            },
        },
        computed: {
            ...mapState({
                account: state => state.account,
                users: state => state.users.all
            })
        },

    }
</script>
