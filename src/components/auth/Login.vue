<template>
    <div class="login container">
        <div class="grey darken-3 card-panel">
            <h2 class="white-text center">Login</h2>
            <form @submit.prevent="loginUser">
                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" name="email" v-model="email">
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <p><router-link :to="{name: 'ForgotPassword'}">Forgot password?</router-link></p>
                <p class="red-text center" v-if="feedback">{{ feedback }}</p>
                <div class="field center">
                    <button class="btn grey darken-2">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Login',
    data(){
        return {
            email: null,
            password: null,
            feedback: null,
        }
    },
    methods: {
        loginUser(){
            if(this.email && this.password){
                this.feedback = null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    if(cred.user.emailVerified){
                        this.$router.push({ name: 'Home'})
                    } else {
                        this.$router.push({ name: 'EmailVerification'})
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.feedback = err.message
                })
            } else {
                this.feedback = 'All fields must be filled in.'
            }
        }        
    }

}
</script>

<style>
    .login{
        max-width: 400px;
        margin-top: 60px;
    }
    .login h2{
        font-size: 2.4em;
    }
    .login .field{
        margin-bottom: 10px;
    }
</style>