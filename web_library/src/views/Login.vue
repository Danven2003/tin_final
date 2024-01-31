<template>
  <div class="auth-page">
    <div class="container">
      <div class="login-box">
        <div>
          <input v-model="email" type="email" autocomplete="off" :placeholder="$t('loginPage.emailPlaceholder')">
          <input v-model="password" type="password" autocomplete="off" :placeholder="$t('loginPage.passwordPlaceholder')">
          <button :disabled="isSubmitting" class="submit-btn" @click="onSubmit">{{ $t('loginPage.logIn') }}</button>
        </div>
        <router-link to="/register" class="link">{{ $t('loginPage.dontHaveAccount')}}</router-link>
        <ul class="error-messages" v-if="validationError">
          <li class="error-message">{{ validationError }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import {mapState} from "vuex";

export default {
  name: 'McvRegister',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationError: state => {
        return state.auth.validationError;
      },
    }),
  },
  methods: {
    onSubmit() {
      this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push({name: 'globalFeed'});
          }).catch(error => {
            console.error('Login failed:', error);
      })
    }
  }
};
</script>


<style scoped>
.error-messages {
  margin-top: 20px;
  padding: 0;
}

.error-message {
  color: red;
  font-size: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  font-family: 'roboto', sans-serif;
}

.container {
  text-align: center;
}

.logo {
  height: 80px;
  display: block;
  margin: 0 auto 50px;
}

input:not(input[type="file"]),
textarea {
  display: block;
  width: 300px;
  height: 40px;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  border: 2px solid #383838;
  outline: none;
  margin: 20px auto;
  color: #383838;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01);
  font-family: 'roboto', sans-serif;
}


::placeholder {
  color: #383838;
}

.submit-btn {
  width: 300px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: #383838;
  color: #fff;
  border-radius: 2px;
  text-transform: capitalize;
  border: none;
  cursor: pointer;
  display: block;
  margin: 30px auto;
}

label {
  text-transform: capitalize;
  display: inline-block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #383838;
}

label a {
  color: #383838;
}

.link {
  color: #383838;
  text-transform: capitalize;
  text-align: center;
  display: block;
  margin-top: 20px;
}

</style>



