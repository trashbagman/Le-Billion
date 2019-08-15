<template>
    <div class="viewthread container">
        <div class="grey darken-3 card-panel">
            <h2 class="white-text center" v-if="thread">{{ thread.title }}</h2>
            <div class="thread-content" id="thread-content"></div>
        </div>
        
        <ul class="collection with-header">
            <li class="collection-header"><h4>Replies</h4></li>
            <li class="collection-item" v-for="(reply, index) in replies" :key="index">
                <p>{{ reply.author }}</p>
                <span id="reply-content" v-html="reply.content"></span>
                <p>{{ reply.time }}</p>
            </li>
        </ul>
        <div class="card-panel">
            <form @submit.prevent="replyThread">
                <div class="field">
                    <vue-editor v-model="replyContent"></vue-editor>
                </div>
                <div class="field right">
                    <button class="btn grey darken-2">Post Reply</button>
                </div>
            </form> 
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import firebase from 'firebase'
import db from '@/firebase/init'
import moment from 'moment'
export default {
    name: 'ViewThread',
    components: {
        VueEditor
    },
    data() {
        return{
            thread: null,
            replies: [],
            replyContent: null,
            feedback: null
        }
    },
    methods:{
        replyThread() {
            if(this.replyContent){
                this.feedback = null
                let ref = db.collection('threads')

                //adds the reply to the database
                ref.doc(this.threadID).collection('replies').add({
                    time: Date.now(),
                    author: firebase.auth().currentUser.displayName,
                    content: this.replyContent
                })
                .then(() => {
                    this.replyContent = null
                })
                
                //increases number replies of the thread in the database by 1
                db.collection('threads').doc(this.threadID).get()
                    .then(doc => {
                        let replies = doc.data().replies
                        db.collection('threads').doc(this.threadID).update({replies: replies + 1})
                    })

            } else {
                this.feedback = 'Can not post empty reply'
            }
        }
    },
    computed:{
        threadID() {
            return "" + this.$route.params.id
        }
    },
    created(){
        let ref = db.collection('threads')
        ref.where('id', '==', this.$route.params.id).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.thread = doc.data()
            })
            document.getElementById("thread-content").innerHTML = this.thread.content
        })

        //adds all the replies in the database to the list in this component
        let newRef = db.collection('threads').doc(this.threadID).collection('replies').orderBy('time')
        newRef.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                    let doc = change.doc
                    this.replies.push({
                        time: moment(doc.data().time).format('MMMM Do YYYY, h:mm:ss a'),
                        author: doc.data().author,
                        content: doc.data().content
                    })

                }
            })
        })
    },

    
}
</script>

<style>
    .viewthread .card-panel{
        margin-top: 20px;
    }
</style>