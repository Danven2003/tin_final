import likeBookApi from '@/api/like_book'
import router from "@/router";

const state = {
    data: null,
    isLoading: false,
    error: null
}

const mutations = {
    sendLikeStart(state) {
        state.isLoading = true
        state.data = null
    },

    getLikedBooksStart(state) {
        state.isLoading = true
        state.data = null
    },

    deleteLikedBooksStart(state) {
        state.isLoading = true
        state.data = null
    },

    sendLikeSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },
    getLikedBooksSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },
    deleteLikedBooksSuccess(state, payload) {
        state.isLoading = false
        state.data = payload
    },


    sendLikeFailure(state) {
        state.isLoading = false
    },
    getLikedBooksFailure(state) {
        state.isLoading = false
    },
    deleteLikedBooksFailure(state) {
        state.isLoading = false
    },
}

const actions = {
    likeBook(context, {book_id}) {
        return new Promise(resolve => {
            console.log("boooook_id", book_id)
            context.commit('sendLikeStart')
            likeBookApi.likeBook(book_id)
                .then(response => {

                    context.commit('sendLikeSuccess', response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        window.location.reload();
                        router.push({name: 'login'});
                    }
                    context.commit('sendLikeFailure')
                })
        })
    },
    getLikedBooks(context) {
        return new Promise((resolve, reject) => {
            context.commit('getLikedBooksStart');
            likeBookApi.getLikedBooks()
                .then(response => {
                    const favouriteBooks = response.data.favouriteBooks;
                    context.commit('getLikedBooksSuccess', {favouriteBooks});
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        window.location.reload();
                        router.push({name: 'login'});
                    }
                    context.commit('getLikedBooksFailure');
                    reject(error);
                });
        });
    },
    deleteLikedBooks(context, book_id) {
        return new Promise((resolve, reject) => {
            context.commit('deleteLikedBooksStart');
            likeBookApi.deleteLikedBook(book_id)
                .then(response => {
                    const favouriteBooks = response.data;
                    context.commit('deleteLikedBooksSuccess', {favouriteBooks});
                    resolve(response.data);
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        window.location.reload();
                        router.push({name: 'login'});
                    }
                    context.commit('deleteLikedBooksFailure');
                    reject(error);
                });
        });
    },
}

export default {
    state,
    actions,
    mutations
}