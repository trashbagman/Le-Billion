<template>
    <div class="viewthread container">
        <div class="card-panel">
            <h3 class="center" v-if="thread">{{ thread.title }}</h3>
            <div class="thread-content" id="thread-content"></div>
        </div>
        
        <div class="replies-list">
            <ul class="collection with-header">
                <li class="collection-header"><h4>Replies</h4></li>
                <li class="collection-item" v-for="(reply, index) in replies" :key="index">
                    <p>{{ reply.author }}</p>
                    <span id="reply-content" v-html="reply.content"></span>
                    <p>{{ reply.time }} <a class="right waves-effect waves-light btn" @click.prevent="ShowReply">reply</a></p>
                    <form @submit.prevent="PostReplyReply" v-if="showReply">
                        <label for="reply">Reply</label>
                        <input type="text" name="reply" v-model="replyreplycontent">
                    </form>
                </li>
            </ul>
        </div>
        <div class="card-panel">
            <form @submit.prevent="replyThread" class="replyThread">
                <div class="field">
                    <vue-editor v-model="replyContent"></vue-editor>
                </div>
                <div class="field right">
                    <button class="btn">Post Reply</button>
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
import slugify from 'slugify'
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
            feedback: null,
            showReply: false,
            replyreplycontent: null,
        }
    },
    methods:{
        PostReplyReply(){

        },
        ShowReply(){
            this.showReply = !this.showReply
        },
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
                
                let slug =  slugify(firebase.auth().currentUser.displayName, {
                        replacement: '-',
                        remove: /[$*_+~.()'"!\-:@]/g,
                        lower: true,
                    })

                let userRef = db.collection('users').doc(slug)
                userRef.get().then(doc => {
                    let reply = doc.data().replies
                    userRef.update({replies: reply + 1})    
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
                        time: moment(doc.data().time).fromNow(),
                        author: doc.data().author,
                        content: doc.data().content
                    })

                }
            })
        })
    },
    mounted() {
        db.collection('threads').doc(this.threadID).get()
            .then(doc => {
                let views = doc.data().views
                db.collection('threads').doc(this.threadID).update({views: views + 1})
            })
    }
}
</script>

<style>
    .viewthread .card-panel{
        margin-top: 20px;
    }
    .viewthread .replyThread{
        margin-bottom: 60px;
    }
    .viewthread button{
        margin-top: 20px;
        background-color: #9e9e9e;
    }
    .viewthread h3{
        font-weight: bolder;
    }
    .viewthread .card-panel{
        background-color: #efefef
    }
    .viewthread .collection-header{
        background-color: #efefef
    }
    .viewthread .collection-item{
        background-color: #efefef
    }
    body{
        background-color: #a9a9a9;
    }
</style>