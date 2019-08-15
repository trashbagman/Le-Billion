<template>
    <div class="navbar">
        <nav class="grey darken-3">
            <div class="container">
                <router-link :to="{name: 'Home'}" class="brand-logo left">LeBillion</router-link>
                <ul class="right">
                    <li v-if="!user"><router-link :to="{name: 'Signup'}">Signup</router-link></li>
                    <li v-if="!user"><router-link :to="{name : 'Login'}">Login</router-link></li>
                    <li v-if="user"><a>{{ user.displayName }}</a></li>
                    <li v-if="user"><a @click.prevent="logout()">Logout</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Navbar',
    data() {
        return {
            user: null,
        }
    },
    methods: {
        logout(){
            firebase.auth().signOut()
            .then(() => this.$router.push({name: 'Login'}))
            .catch(err => console.log(err))
        }
    },
    created(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.user = user
            } else {
                this.user = null
            }
        })
    }
}
</script>

<style>

</style>
