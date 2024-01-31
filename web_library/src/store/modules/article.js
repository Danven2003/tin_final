import articleApi from '@/api/article'
import router from "@/router";

const state = {
    data: null,
    isLoading: false,
    error: null
}

const mutations = {
    getArticleStart(state) {
        state.isLoading = true
        state.data = null
    },
    createArticleStart(state) {
        state.isLoading = true
        state.data = null
    },

    getArticleSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },
    createArticleSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },

    getArticleFailure(state){
        state.isLoading = false
    },
    createArticleFailure(state){
        state.isLoading = false
    }
}

const actions = {
    getArticle(context, {slug}) {
        return new Promise(resolve => {
            context.commit('getArticleStart')
            articleApi.getArticle(slug)
                .then(response => {
                    context.commit('getArticleSuccess', response.data)
                    resolve(response.data)
                })
                .catch(() => {
                    context.commit('getArticleFailure')
                })
        })
    },
    createArticle(context, bookData) {
        return new Promise(resolve => {
            context.commit('createArticleStart')
            articleApi.createArticle(bookData)
                .then(response => {
                    context.commit('createArticleSuccess', response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        window.location.reload();
                        router.push({name: 'login'});
                    }
                    context.commit('createArticleFailure')
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}