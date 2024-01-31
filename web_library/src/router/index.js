import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '@/views/Register.vue'
import Login from "@/views/Login.vue"
import GlobalFeed from "@/views/GlobalFeed.vue";
import Article from "@/views/Article.vue";
import Profile from "@/views/Profile.vue";
import CreateArticle from "@/views/CreateArticle.vue";
import UserBooks from "@/views/UserBooks.vue";
import UserFavouriteBooks from "@/views/UserFavouriteBooks.vue";

Vue.use(VueRouter)

class CustomVueRouter extends VueRouter {
    push(location) {
        return VueRouter.prototype.push.call(this, location).catch(err => {
            if (err.name !== 'NavigationDuplicated') {
                throw err;
            }
        });
    }
}
const routes = [
    {
        path: '/',
        name: 'globalFeed',
        component: GlobalFeed
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/articles/:slug',
        name: 'article',
        component: Article
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/profile/createArticle',
        name:'createArticle',
        component: CreateArticle
    },
    {
        path:'profile/favourite_books',
        name: 'userFavouriteBooks',
        component: UserFavouriteBooks
    },
    {
        path:'/profile/books',
        name: 'userBooks',
        component: UserBooks
    }
]


const router = new CustomVueRouter({
    routes,
    mode: 'history'
});

export default router