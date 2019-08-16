<template>
    <div class="viewprofile container">
        <div class="card-panel">
        <div class="row userprofile">
            <div class="col s12 white-text center grid-example grid-title">
                <h2>{{userprofile.displayName}}</h2>
            </div>
            <div class="col s6 white-text center grid-example">
                Join date: {{userprofile.joinDate}}
            </div>
            <div class="col s6 white-text center grid-example">
                Last Online: {{userprofile.lastOnline}}
            </div>
            <div class="col s6 white-text center grid-example">
                <p>Threads: {{userprofile.threads}}</p>
            </div>
            <div class="col s6 white-text center grid-example">
                <p>Replies: {{userprofile.replies}}</p>
            </div>
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
            this.userprofile.lastOnline = moment(this.userprofile.lastOnline).fromNow(); // 7 years ago
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
        background-color: gray;
        color: white;
        padding: 0;
    }
    .col.grid-title{
        text-align: left;
        padding-left: 10px;
    }

    .viewprofile .userprofile{
        margin-top: 20px;
    }
</style>