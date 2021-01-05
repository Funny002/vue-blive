import {RouteConfig} from "vue-router";

/* webpackChunkName: "layout" */
export default [{
    path: '/',
    name: 'Layout',
    redirect: "/index",
    component: () => import('@/views/layout/index.vue'),
    children: [{
        path: "index",
        name: "HomeMain",
        meta: {title: "首页"},
        component: () => import('@/views/home/index.vue')
    }, {
        path: "project",
        name: "ProjectMain",
        meta: {title: "项目"},
        component: () => import('@/views/project/index.vue')
    }]
}, {
    path: "/workbench",
    name: "workbenchMain",
    meta: {title: "工作台"},
    redirect: "/workbench/view",
    component: () => import('@/views/workbench/main.vue'),
    children: [{
        props: true,
        path: "view/:error?",
        name: "workbenchView",
        component: () => import('@/views/workbench/view/index.vue')
    }, {
        props: true,
        path: "editor/:uuid?",
        name: "workbenchEditor",
        component: () => import('@/views/workbench/editor/index.vue')
    }]
}, {
    path: "*",
    component: () => import('@/views/error/main.vue'),
}] as Array<RouteConfig>