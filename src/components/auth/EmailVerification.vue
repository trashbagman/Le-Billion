<template>
    <div class="emailVerification container">
        <div class="grey darken-3 card-panel">
            <h2 class="white-text center">Verify Email</h2>
            <p class="white-text"> Thanks for signing up! An email verification has been sent to you. Please verify your email to login.</p>
            <p class="white-text">Didn't get the email?<a href='' @click.prevent="resendEmail"> Click here</a> to resend</p>
            <p class="white-text"><a href=''>Click here</a> when verification is finished.</p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'EmailVerification',
    data() {
        return{
        }
    },
    methods: {
        resendEmail() {
            alert("New Verification Sent")
            firebase.auth().currentUser.sendEmailVerification()
        },
    }
}
</script>
<style>
    .emailVerification{
        max-width: 400px;
        margin-top: 60px;
    }
    .emailVerification h2{
        font-size: 2.4em;
    }

</style>