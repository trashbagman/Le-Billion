<template>
    <div class="forgotPassword container">
        <div class="card-panel">
            <h2 class="center">Forgot Password?</h2>
            <form @submit.prevent="resetPass">
                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" name="email" v-model="email">
                </div>
                <p class="red-text center" v-if="feedback">{{ feedback }}</p>
                <div class="field">
                    <button class="btn grey">Reset Password</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'ForgotPassword',
    data() {
        return {
            email: null,
            feedback: null
        }
    },
    methods: {
        resetPass(){
            if(this.email){
                this.feedback = null
                firebase.auth().sendPasswordResetEmail(this.email)
                .then(alert('Password reset Email Sent'))
                .catch(err => console.log(err))
            } else {
                this.feedback = 'Please enter an Email Address'
            }
        }
    }
}
</script>

<style>
    .forgotPassword{
        max-width: 400px;
        margin-top: 60px;
    }
    .forgotPassword h2{
        font-size: 2.4em;
    }
    .forgotPassword .field{
        margin-bottom: 10px;
    }
    .forgotPassword .card-panel{
        background-color: #efefef;
    }
</style>