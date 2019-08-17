<template>
    <div class="createthread container">
        <div class="card-panel">
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <form @submit.prevent="createThread" class="field-form">
                <div class="field">
                    <label for="title"></label>
                    <input type="text" name="title" v-model="thread.title">
                </div>
                <div class="field-rich">
                    <vue-editor v-model="thread.content"></vue-editor>
                </div>
                <div class="field right">
                    <button class="btn grey darken-2">Post Thread</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import firebase from 'firebase'
import db from '@/firebase/init'
import slugify from 'slugify'
import * as firebase2 from 'firebase';


export default {
    name: 'CreateThread',
    components: {
        VueEditor
    },
    data() {
        return {
            thread: {
                title: null,
                content: null,
            }, 
            feedback: null,
        }
    },
    methods: {
        createThread(){
            
            if(this.thread.title && this.thread.content){
                this.feedback = null
                

                db.collection('threadIndexer').doc('index').get()
                .then(doc => {
                    let id = doc.data().newestID

                    let slug =  slugify(firebase.auth().currentUser.displayName, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true,
                    })

                    let currentUserRef = db.collection('users').doc(slug)

                    currentUserRef.update({'threadList': firebase2.firestore.FieldValue.arrayUnion(id)})
                    currentUserRef.get().then(doc => {
                        let threads = doc.data().threads
                        currentUserRef.update({threads: threads + 1})
                    })

                    db.collection('threads').doc(""+id).set({
                        author: firebase.auth().currentUser.displayName,
                        replies: 0,
                        title: this.thread.title,
                        views: 0,
                        content: this.thread.content,
                        id: id,
                        time: Date.now(),
                        slug: slug,
                    })
                    .then(() => db.collection('threadIndexer').doc('index').set({newestID: id + 1}))
                })
                .then(() => {
                    this.$router.push({name: 'Home'})
                })   
            } else {
                this.feedback = 'Fields cannot be empty'
            }
        }
    }
}
</script>

<style>
    .createthread .card-panel{
        margin-top: 60px;
    }
    .createthread .field{
        margin-top: 20px;
    }
    .createthread .field-form{
        margin-bottom: 60px;
    }
</style>