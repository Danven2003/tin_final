import authApi from '@/api/auth'

import {setItem} from '@/helpers/persistanceStorage'
import router from "@/router";


const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationError: null,
    isLoggedIn: null
}

const mutations = {
    registerStart(state) {
        state.isSubmitting = true
        state.validationError = null
    },
    registerSuccess(state) {
        state.isSubmitting = false
    },
    registerFailure(state, payload) {
        state.isSubmitting = false
        state.validationError = payload
    },
    loginStart(state) {
        state.isSubmitting = true
        state.validationError = null
    },
    loginSuccess(state, payload) {
        state.isSubmitting = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    loginFailure(state, payload) {
        state.isSubmitting = false
        state.validationError = payload
    },

    getCurrentUserStart(state) {
        state.isLoading = true
    },
    getCurrentUserSuccess(state, payload) {
        state.isLoading = false
        state.currentUser = payload
        state.isLoggedIn = true
    },
    getCurrentUserFailure(state) {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
    },

    logoutStart(state) {
        state.isLoading = true
    },
    logoutSuccess(state) {
        state.isLoading = false
        state.currentUser = null
        state.isLoggedIn = false
    },
    logoutFailure(state) {
        state.isLoading = false
        state.isLoggedIn = true
    }
}

const actions = {
    register(context, credentials) {
        return new Promise(resolve => {
            context.commit('registerStart')
            authApi
                .register(credentials)
                .then(response => {
                    context.commit('registerSuccess', response.data)
                    resolve(response.data)
                })
                .catch(result => {
                    context.commit('registerFailure', result.response.data.error)
                })
        })
    },
    login(context, credentials) {
        return new Promise((resolve, reject) => {
            context.commit('loginStart')
            authApi
                .login(credentials)
                .then(response => {
                    context.commit('loginSuccess', response.data)
                    setItem('accessToken', response.data.token)
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error) {
                        context.commit('loginFailure', error.response.data.error)
                        reject(error.response.data.error)
                    } else {
                        context.commit('loginFailure', 'An error occurred during login.')
                        reject('An error occurred during login.')
                    }
                })
        })
    },
    getCurrentUser(context, user_id) {
        return new Promise(resolve => {
            context.commit('getCurrentUserStart')
            authApi
                .getCurrentUser(user_id)
                .then(response => {
                    context.commit('getCurrentUserSuccess', response.data)
                    resolve(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        router.push({name: 'login'});
                    }
                    context.commit('getCurrentUserFailure')
                })
        })
    },
    logout(context) {
        return new Promise(resolve => {
            context.commit('logoutStart')
            authApi
                .logout()
                .then(response => {
                    context.commit('logoutSuccess', response.data)
                    resolve(response.data)
                    console.log("respooooonse", response)
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        window.location.reload();
                        router.push({name: 'login'});
                    }
                    context.commit('logoutFailure')
                })
        })
    },

}
const getters = {
    currentUser: state => {
        return state.currentUser
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}