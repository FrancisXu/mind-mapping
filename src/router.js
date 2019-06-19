import Vue from 'vue'
import Router from 'vue-router'


const index = () => import(    /* webpackChunkName: "index" */    './views/index.vue');

let routerArr = [
    {
        path: "/index",
        name: "index",
        component: index
    }
];

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: routerArr
});


export default router;

