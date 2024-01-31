import user_book from '@/api/user_book'
import router from "@/router";

const state = {
    data: null,
    isLoading: false,
    error: null
}

const mutations = {
    getUsersBooksStart(state) {
        state.isLoading = true
        state.data = null
    },
    deleteUsersBooksStart(state) {
        state.isLoading = true
        state.data = null
    },

    getUsersBooksSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },
    deleteUsersBooksSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },

    getUsersBooksFailure(state) {
        state.isLoading = false
    },
    deleteUsersBooksFailure(state) {
        state.isLoading = false
    },
}

const actions = {
    getUsersBooks(context) {
        return new Promise(resolve => {
            context.commit('getUsersBooksStart')
            user_book.getUsersBooks()
                .then(response => {
                    context.commit('getUsersBooksSuccess', response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        window.location.reload();
                        router.push({name: 'login'});
                    }
                    context.commit('getUsersBooksFailure')
                })
        })
    },

    deleteUsersBooks(context, book_id) {
        return new Promise(resolve => {
            context.commit('deleteUsersBooksStart')
            user_book.deleteUserBook(book_id)
                .then(response => {
                    context.commit('deleteUsersBooksSuccess', response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        window.location.reload();
                        router.push({name: 'login'});
                    }
                    context.commit('deleteUsersBooksFailure')
                })
        })
    },

}

export default {
    state,
    actions,
    mutations
}