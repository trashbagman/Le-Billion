<template>
    <div class="home container">
        <div class="card-panel threads">
          <router-link :to="{name: 'CreateThread'}"><button class="btn">Create Thread</button></router-link>
          <table>
            <tr>
              <th class="">Thread</th>
              <th class="">Author</th>
              <th class="center">Replies</th>
              <th class="center">Views</th>
              <th class="center">Date Created</th>
            </tr>
            <tr v-for="thread in reversedThreads" :key="thread.id">
              <td class="thread-title"><router-link :to="{name: 'ViewThread', params: {id: thread.id}}">{{ thread.title }}</router-link></td>
              <td class=""><router-link :to="{name: 'ViewProfile', params: {slug: thread.slug}}">{{ thread.author }}</router-link></td>
              <td class="center">{{ thread.replies }}</td>
              <td class="center">{{ thread.views }}</td>
              <td class="center">{{ thread.time }}</td>
            </tr>
          </table>
        </div>  
    </div>
</template>

<script>
import moment from 'moment'
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
  name: 'Home',
  data () {
    return {
      threads: [],
    }
  },
  computed: {
    reversedThreads(){
      return this.threads.reverse()
    },
  },
  created(){
    let ref = db.collection('threads').orderBy('time')

    ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.threads.push({
              time: moment(doc.data().time).format('MMMM Do YYYY, h:mm:ss a'),
              author: doc.data().author,
              replies: doc.data().replies,
              title: doc.data().title,
              views: doc.data().views,
              id: doc.data().id,
              slug: doc.data().slug
            })
          }
      })
    })
  },
  mounted() {
    db.collection("users").where("displayName", "==", firebase.auth().currentUser.displayName).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let docID = doc.id
        db.collection("users").doc(doc.id).update({lastOnline: Date.now()})
      })
    })


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .home .threads{
    margin-top: 60px;
  }
  .home button{
    background-color: #9e9e9e;
  }
  body{
    background-color: #a9a9a9
  }
  .home .thread-title{
    font-size: 1.4em;
    font-weight: bolder;
  }
  .home .threads{
    background-color: #efefef;
  }
</style>
