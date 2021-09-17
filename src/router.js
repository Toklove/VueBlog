import {createRouter, createWebHashHistory} from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    showSpinner: true
})
const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('./view/Index.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('./view/Home.vue')

    },
    {
        path: '/articles',
        name: 'Article',
        component: () => import('./view/Article.vue')
    },
    {
        path: '/articles/:id',
        name: 'Articles',
        props: true,
        component: () => import('./view/Articles.vue')
    },
    {
        path: '/:path(.*)',
        name:'NotFound',
        component: () => import('./components/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to,from,next) => {
    NProgress.start()
    const date = new Date()
    if (date.getHours() >= 19 || date.getHours() <= 7){
        document.documentElement.dataset.userColorScheme = 'dark';
    }
    next()
})
router.afterEach(() => {
    NProgress.done()
})
export default router;
