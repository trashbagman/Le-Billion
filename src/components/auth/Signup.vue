<template>
    <div class="signup container">
        <div class="grey darken-3 card-panel">
            <h2 class="white-text center">SignUp</h2>
            <form @submit.prevent="signupUser">
                <div class="field">
                    <label for="username">Username</label>
                    <input type="text" name="username" v-model="username">
                </div>
                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" name="email" v-model="email">
                </div>
                <div class="field">
                    <label for="password">Password</label>
                    <input type="password" name="password" v-model="password">
                </div>
                <div class="field">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" name="confirm-password" v-model="confirm_password">
                </div>
                <p class="red-text center" v-if="feedback">{{ feedback }}</p>
                <div class="field center">
                    <button class="btn grey darken-2" v-if="!signingUp">Signup</button>
                </div>
                <div class="center" v-if="signingUp">
                    <div class="preloader-wrapper small active">
                        <div class="spinner-layer spinner-green-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
import functions from 'firebase/functions'
import slugify from 'slugify'
export default {
    name: 'Signup',
    data(){
        return{
            username: null,
            email: null,
            password: null,
            confirm_password: null,
            slug: null,
            feedback: null,
            signingUp: null
        }
    },
    methods: {
        signupUser(){
            if(this.username && this.email && this.password && this.confirm_password){
                this.feedback = null
                if(this.password == this.confirm_password){
                    this.feedback = null
                    this.signingUp = true
                    //Create Slug
                    this.slug = slugify(this.username, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true,
                    })

                    //Chack if username exists
                    let checkAlias = firebase.functions().httpsCallable('checkAlias')
                    checkAlias({slug: this.slug})
                    .then(result => {
                        console.log(result)
                        if(!result.data.unique){
                            this.feedback = 'This alias already exists'
                            this.signingUp = false
                        } else {
                            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                            //Upload userdata to firestore
                            .then(cred => {
                                db.collection('users').doc(this.slug).set({
                                    displayName: this.username,
                                    threads: 0,
                                    replies: 0,
                                    uid: cred.user.uid,
                                    joinDate: Date.now(),
                                    lastOnline: Date.now()
                                })
                                firebase.auth().currentUser.updateProfile({
                                    displayName: this.username
                                })
                                .catch(err => {
                                    console.log(err)
                                    this.signingUp = false
                                })
                            })
                            //Send email verification
                            .then(() => {
                                firebase.auth().currentUser.sendEmailVerification()
                                .then(() => this.$router.push({name: 'EmailVerification'}))
                            })
                            .catch(err => {
                                console.log(err)
                                this.feedback = err.message
                                this.signingUp = false
                            })
                        }
                    })
                } else {
                    this.feedback = 'Make sure both passwords are correct.'
                    this.signingUp = false
                }
            }else{
                this.feedback = 'All fields need to be filled in'
            }
        }
    }
}
</script>

<style>
    .signup{
        max-width: 400px;
        margin-top: 60px;
    }
    .signup h2{
        font-size: 2.4em;
    }
    .signup .field{
        margin-bottom: 10px;
    }
</style>
