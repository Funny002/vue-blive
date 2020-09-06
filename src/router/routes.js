export default [{
    path: "/",
    name: "Home",
    redirect: "/index",
    meta: {title: "首页"},
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/index.vue'),
    children: [{
        path: "index",
        name: "index",
        meta: {title: "首页"},
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/main/index.vue'),
    }, {
        path: "about",
        name: "about",
        meta: {title: "我"},
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/main/index.vue'),
    }, {
        path: "project",
        name: "project",
        meta: {title: "项目"},
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/main/index.vue'),
    }, {
        path: "donate",
        name: "donate",
        meta: {title: "捐赠"},
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/main/index.vue'),
    }]
}, {
    path: "/dashboard",
    name: "DashBoard",
    meta: {title: "仪表盘"},
    component: () => import(/* webpackChunkName: "DashBoard" */ '../views/DashBoard/index.vue')
}, {
    name: "Workbench",
    path: "/workbench",
    meta: {title: "工作台"},
    redirect: "/workbench/index",
    component: () => import(/* webpackChunkName: "Workbench" */ '../views/Workbench/index.vue'),
    children: [{
        path: "index",
        name: "workbenchView",
        component: () => import(/* webpackChunkName: "Workbench" */ '../views/Workbench/view/index.vue'),
    }, {
        props: true,
        path: "editor/:uuid?",
        name: "workbenchEditor",
        component: () => import(/* webpackChunkName: "Workbench" */ '../views/Workbench/editor/index.vue'),
    }]
}]
