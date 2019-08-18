<template>
    <div class="emailVerification container">
        <div class="card-panel">
            <h2 class="center">Verify Email</h2>
            <p class=""> Thanks for signing up! An email verification has been sent to you. Please verify your email to login.</p>
            <p class="">Didn't get the email?<a href='' @click.prevent="resendEmail"> Click here</a> to resend</p>
            <p class=""><a href=''>Click here</a> when verification is finished.</p>
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
    .emailVerification .card-panel{
        background-color: #efefef;
    }

</style>