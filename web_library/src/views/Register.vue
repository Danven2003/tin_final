<template>
  <div class="auth-page">
    <div class="container">
      <div class="login-box">
        <div class="form-container">
          <div class="input-container">
            <input v-model="email" type="email" autocomplete="off" :placeholder="$t('registrationPage.emailPlaceholder')" autocapitalize="off">
            <p class="error-msg">{{ getErrorMessage('email') }}</p>
          </div>
          <div class="input-container">
            <input v-model="password" type="password" autocomplete="off" :placeholder="$t('registrationPage.passwordPlaceholder')">
            <p class="error-msg">{{ getErrorMessage('password') }}</p>
          </div>
          <div class="input-container">
            <input v-model="username" type="text" autocomplete="off" :placeholder="$t('registrationPage.usernamePlaceholder')">
            <p class="error-msg">{{ getErrorMessage('username') }}</p>
          </div>
          <div class="input-container">
            <input v-model="name" type="text" autocomplete="off" :placeholder="$t('registrationPage.namePlaceholder')">
            <p class="error-msg">{{ getErrorMessage('name') }}</p>
          </div>
          <div class="input-container">
            <input v-model="surname" type="text" autocomplete="off" :placeholder="$t('registrationPage.surnamePlaceholder')">
            <p class="error-msg">{{ getErrorMessage('surname') }}</p>
          </div>
          <div class="input-container">
            <input v-model="place_of_living" type="text" autocomplete="off" :placeholder="$t('registrationPage.placeOfLivingPlaceholder')">
            <p class="error-msg">{{ getErrorMessage('place_of_living') }}</p>
          </div>
          <div class="input-container">
            <input v-model="telephone" type="text" autocomplete="off" :placeholder="$t('registrationPage.telephonePlaceholder')">
            <p class="error-msg">{{ getErrorMessage('telephone') }}</p>
          </div>
          <div class="input-container select-container">
            <label for="sex">{{ $t('registrationPage.sexLabel') }}:</label>
            <select v-model="sex" id="sex">
              <option value="male">{{ $t('registrationPage.maleOption') }}</option>
              <option value="female">{{ $t('registrationPage.femaleOption') }}</option>
            </select>
          </div>
          <button @click="onSubmit" :disabled="isSubmitting" class="submit-btn">{{ $t('registrationPage.register') }}</button>
        </div>
        <router-link to="/login" class="link">{{ $t("registrationPage.haveAccount") }}</router-link>
      </div>
      <div class="alert-box" v-if="validationErrors && validationErrors.length > 0">
        <p class="alert-msg">{{ validationErrors[0] }}</p>
      </div>
    </div>
    <ul class="error-messages" v-if="validationError">
      <li class="error-message">{{ validationError }}</li>
    </ul>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'McvRegister',
  data() {
    return {
      email: '',
      password: '',
      username: '',
      name: '',
      surname: '',
      place_of_living: '',
      telephone: '',
      sex: 'male',
      validationErrors: []
    };
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationError: state => {
        console.log('Validation Errors:', state.auth.validationError);
        return state.auth.validationError;
      },
    }),
  },
  methods: {
    validateForm() {
      this.validationErrors = [];

      if (!this.email || !this.password || !this.username || !this.name || !this.surname || !this.place_of_living || !this.telephone) {
        this.validationErrors.push('All fields are required.');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.validationErrors.push('Invalid email format.');
      }

      if (this.password.length < 8 || !/[!@#$%^&*(),.?":{}|<>_]/.test(this.password)) {
        this.validationErrors.push('Password must be at least 8 characters long and contain special characters.');
      }

      if (this.username.length < 6) {
        this.validationErrors.push('Username must be at least 6 characters long.');
      }

      return this.validationErrors.length === 0;
    },
    onSubmit() {
      if (this.validateForm()) {
        this.$store.dispatch('register', {
          email: this.email,
          password: this.password,
          username: this.username,
          name: this.name,
          surname: this.surname,
          place_of_living: this.place_of_living,
          telephone: this.telephone,
          sex: this.sex
        })
            .then(() => {
              this.$router.push({ name: 'login' });
            });
      }
    },
    getErrorMessage(field) {
      if (this.validationErrors.includes('All fields are required.')) {
        return this.validationErrors[0];
      }
      switch (field) {
        case 'email':
          return this.validationErrors.find(error => error.startsWith('Invalid email')) || '';
        case 'password':
          return this.validationErrors.find(error => error.startsWith('Password')) || '';
        case 'username':
          return this.validationErrors.find(error => error.startsWith('Username')) || '';
        case 'name':
          return this.validationErrors.find(error => error.startsWith('Name')) || '';
        case 'surname':
          return this.validationErrors.find(error => error.startsWith('Surname')) || '';
        case 'place_of_living':
          return this.validationErrors.find(error => error.startsWith('Place of Living')) || '';
        case 'telephone':
          return this.validationErrors.find(error => error.startsWith('Telephone')) || '';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>


.error-messages {
  margin-top: 20px;
  padding: 0;
  text-align: center;
}

.error-message {
  color: red;
  font-size: 16px;
  list-style: none;
}

.input-container {
  position: relative;
  margin-bottom: 20px;
}

.error-msg {
  position: absolute;
  top: 30%;
  left: 65%;
  margin-left: 10px;
  color: #e24c4b;
  font-size: 14px;
}
.container {
  text-align: center;
}

.select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.select-container label {
  text-align: left;
  margin-bottom: 5px;
}

.select-container select {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  background: #fff;
  border: 2px solid #383838;
  outline: none;
  color: #383838;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01);
  font-family: 'roboto', sans-serif;
  margin-top: 5px;
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

.alert-box {
  width: 300px;
  min-height: 150px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 100px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  opacity: 0;
  pointer-events: none;
  transition: 1s;
  z-index: 2;
}

.alert-box.show {
  opacity: 1;
  pointer-events: all;
  top: 50%;
}

.alert-img {
  display: block;
  margin: 10px auto 20px;
  height: 60px;
}

.alert-msg {
  color: #e24c4b;
  font-size: 20px;
  text-transform: capitalize;
  text-align: center;
  line-height: 30px;
  font-weight: 500;
}

</style>
