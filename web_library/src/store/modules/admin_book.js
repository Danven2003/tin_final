import adminApi from '@/api/admin_book'
import router from "@/router";

const state = {
    data: null,
    isLoading: false,
    error: null
}

const mutations = {
    deleteBookStart(state) {
        state.isLoading = true
        state.data = null
    },

    deleteBookSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },

    deleteBookFailure(state) {
        state.isLoading = false
    }
}

    const actions = {
        deleteBook(context, { book_id }) {
            return new Promise((resolve, reject) => {
                context.commit('deleteBookStart')
                adminApi.deleteBook(book_id)
                    .then(response => {
                        context.commit('deleteBookSuccess', response.data)
                        resolve(response.data)
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            window.location.reload();
                            router.push({name: 'login'});
                         }
                        context.commit('deleteBookFailure')
                        reject(error)
                    })
            })
        },
    }

export default {
    state,
    actions,
    mutations
}