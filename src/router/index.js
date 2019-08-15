import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/components/home/Home'),
      meta: {
        requiresAuth: true,
        requiresVerif: true
      }
    },
    {
      path: '/profile/:slug',
      name: 'ViewProfile',
      component: () => import('@/components/profile/ViewProfile'),
      meta:{
        requiresAuth: true,
        requiresVerif: true
      }
    },
    {
      path: '/thread/:id',
      name: 'ViewThread',
      component: () => import('@/components/threads/ViewThread'),
      meta:{
        requiresAuth: true,
        requiresVerif: true
      }
    },
    {
      path: '/createthread',
      name: 'CreateThread',
      component: () => import('@/components/home/CreateThread'),
      meta: {
        requiresAuth: true,
        requiresVerif: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresNonAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresNonAuth: true
      }
    },
    {
      path: '/emailVerify',
      name: 'EmailVerification',
      component: () => import('@/components/auth/EmailVerification'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forgotpass',
      name: 'ForgotPassword',
      component: () => import('@/components/auth/ForgotPassword'),
      meta: {
        requiresNonAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    //check auth stat of user
    let user = firebase.auth().currentUser
    if(user){
      //user is signed in
      if(to.matched.some(rec => rec.meta.requiresVerif)){
        if(user.emailVerified){
          next()
        } else {
          next({name: 'EmailVerification'})
        }
      } else {
        next()
      }
    }else{
      //redirect to login
      next({ name: 'Login'})
    }
  }else if(to.matched.some(rec => rec.meta.requiresNonAuth)){
    let user = firebase.auth().currentUser
    if(!user){
      next()
    } else {
      next({name: 'Home'})
    }
  } else {
    next()
  }
})

export default router