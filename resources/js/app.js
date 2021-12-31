require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue/dist/vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import VueRouter from 'vue-router'
import App from './App.vue';
window.Vue = Vue
Vue.use(VueRouter)


Vue.use(VueAxios, axios);

import IndexComponent from './components/posts/Index.vue';
import CreateComponent from './components/posts/Create.vue';
import EditComponent from './components/posts/Edit.vue';
import LoginComponent from './components/auth/Login.vue';
import RegisterComponent from './components/auth/Register.vue';

const routes = [
    {
        name: 'dashboard',
        path: '/',
        component: IndexComponent,
        meta: { requiresAuth: true }
    },
    {
        name: 'create',
        path: '/create',
        component: CreateComponent
    },
    {
        name: 'edit',
        path: '/edit/:id',
        component: EditComponent
    },
    {
        name: 'login',
        path: '/login',
        component: LoginComponent
    },
    {
        name: 'register',
        path: '/register',
        component: RegisterComponent
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');