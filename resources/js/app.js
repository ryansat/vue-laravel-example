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

const routes = [
    {
        name: 'posts',
        path: '/',
        component: IndexComponent
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
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');