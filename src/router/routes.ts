import {RouteConfig} from "vue-router";

const routes: Array<RouteConfig> = [{
    path: "/",
    name: "Blog",
    redirect: "/index",
    meta: {title: "首页"},
    component: () => import(/* webpackChunkName: "Blog" */ '@/views/Blog/frame/index.vue'),
    children: [{
        path: "index",
        name: "blogIndex",
        meta: {title: "首页"},
        component: () => import(/* webpackChunkName: "Blog" */ '@/views/Blog/module/index/index.vue'),
    }, {
        path: "about",
        name: "blogAbout",
        meta: {title: "关于我"},
        component: () => import(/* webpackChunkName: "Blog" */ '@/views/Blog/module/about/index.vue'),
    }, {
        path: "project",
        name: "blogProject",
        meta: {title: "项目"},
        component: () => import(/* webpackChunkName: "Blog" */ '@/views/Blog/module/project/index.vue'),
    }, {
        path: "donate",
        name: "blogDonate",
        meta: {title: "捐赠"},
        component: () => import(/* webpackChunkName: "Blog" */ '@/views/Blog/module/donate/index.vue'),
    }]
}, {
    name: "Workbench",
    path: "/workbench",
    meta: {title: "工作台"},
    redirect: "/workbench/index",
    component: () => import(/* webpackChunkName: "Workbench" */ '@/views/Workbench/index.vue'),
    children: [{
        props: true,
        path: "index/:error?",
        name: "workbenchView",
        component: () => import(/* webpackChunkName: "Workbench" */ '@/views/Workbench/view/index.vue'),
    }, {
        props: true,
        path: "editor/:uuid?",
        name: "workbenchEditor",
        component: () => import(/* webpackChunkName: "Workbench" */ '@/views/Workbench/editor/index.vue'),
    }]
}, {
    path: "*",
    name: "Error",
    meta: {title: "404"},
    component: () => import('@/views/public/error/index.vue'),
}];

export default routes
