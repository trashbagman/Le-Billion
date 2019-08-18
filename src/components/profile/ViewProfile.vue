<template>
    <div class="viewprofile container">

        <div class="row userprofile">
            <div class="col s12 center grid-example grid-title">
                <h2>{{userprofile.displayName}}</h2>
            </div>
            <div class="col s6 center grid-example">
                Join date: {{userprofile.joinDate}}
            </div>
            <div class="col s6 center grid-example">
                Last Online: {{userprofile.lastOnline}}
            </div>
            <div class="col s6 center grid-example">
                <p><router-link :to="{name: 'ProfileThreadList', params:{slug: this.$route.params.slug}}">Threads:</router-link> {{userprofile.threads}}</p>
            </div>
            <div class="col s6 center grid-example">
                <p>Replies: {{userprofile.replies}}</p>
            </div>
        </div>
        
    </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'
export default {
    name: 'ViewProfile',
    data(){
        return{
            userprofile: {
                displayName: null,
                threads: null,
                replies: null,
                joinDate: null,
                lastOnline: null
            }
        }
    },
    created(){
        let ref = db.collection('users').doc(this.$route.params.slug)
        
        ref.get().then(doc => {
            this.userprofile = doc.data()
            this.userprofile.joinDate = moment(this.userprofile.joinDate).format('MMMM Do YYYY')
            this.userprofile.lastOnline = moment(this.userprofile.lastOnline).fromNow()
        })
    }
}
</script>

<style>

    .col.grid-example {
        border: 1px solid #eee;
        margin: 7px 0;
        margin-left: 0px;
        text-align: center;
        line-height: 50px;
        font-size: 28px;
        background-color: #efefef;
        color: #111;
        padding: 0;
    }
    .col.grid-title{
        text-align: left;
        padding-left: 30px;
    }

    .viewprofile .userprofile{
        margin-top: 20px;
    }
    body{
    background-color: #a9a9a9
  }
</style>