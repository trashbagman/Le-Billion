<template>
    <div class="about container">
        <div class="card-panel">
            <h2>About this Project</h2>
            <p>This is a forum made entirely with <a href='https://vuejs.org/'>Vue.js</a> with a <a href='https://firebase.google.com/'>Firebase</a> backend.</p>

            <ul>
                <h5>Features:</h5>
                Authorization:
                <li>- User Signup and Login</li>
                <li>- Email Verification and Password Reser</li>
                Forum:
                <li>- Create thread with Rich Text Editor</li>
                <li>- Post replies to thread</li>
                <li>- Thread keeps track of the amount of views and replies</li>
                <li>- Can see all threads made by a specific user.</li>
            </ul>
            <p>Used Quill api for rich text editor</p>
            <p>Source Code: <a href="https://github.com/trashbagman/Le-Billion">Github</a></p>
            <p>© Erik Z. 2019</p>
        </div>
    </div>
</template>

<style>
  body{
    background-color: #a9a9a9
  }
  .about .card-panel{
      background-color: #efefef;
  }

</style>