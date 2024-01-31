<template>
  <div>
    <div class="container mt-5">
      <div class="profile-info text-center mb-5">
        <h1 class="display-4">{{ $t('profilePage.username') }}: {{ currentUser.user.username }}</h1>
        <h1 class="display-4">{{ $t('profilePage.email') }}: {{ currentUser.user.email }}</h1>
      </div>
      <div class="profile-header text-center mb-5">
        <div class="row">
          <div class="col-md-4">
            <p><strong>{{ $t('profilePage.name') }}:</strong>{{ currentUser.user.name }}</p>
          </div>
          <div class="col-md-4">
            <p><strong>{{ $t('profilePage.surname') }}:</strong> {{ currentUser.user.surname }}</p>
          </div>
          <div class="col-md-4">
            <p><strong>{{ $t('profilePage.telephone') }}:</strong> {{ currentUser.user.telephone }}</p>
          </div>
          <div class="col-md-4">
            <p><strong>{{ $t('profilePage.registrationDate') }}:</strong> {{ currentUser.user.date_of_registration }}</p>
          </div>
          <div class="col-md-4">
            <p><strong>{{ $t('profilePage.sex') }}:</strong> {{ currentUser.user.sex }}</p>
          </div>
          <div class="col-md-4">
            <p><strong>{{ $t('profilePage.role') }}:</strong> {{ currentUser.user.role }}</p>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'createArticle'}" class="button type--A">
      <div class="button__line"></div>
      <div class="button__line"></div>
      <span class="button__text">{{ $t('profilePage.createArticle') }}</span>
      <div class="button__drow1"></div>
      <div class="button__drow2"></div>
    </router-link>
    <router-link :to="{ name: 'userFavouriteBooks'}" class="button type--A">
      <div class="button__line"></div>
      <div class="button__line"></div>
      <span class="button__text">{{ $t('profilePage.favoriteBooks') }}</span>
      <div class="button__drow1"></div>
      <div class="button__drow2"></div>
    </router-link>
    <router-link :to="{ name: 'userBooks'}" class="button type--A">
      <div class="button__line"></div>
      <div class="button__line"></div>
      <span class="button__text">{{ $t('profilePage.myBooks') }}</span>
      <div class="button__drow1"></div>
      <div class="button__drow2"></div>
    </router-link>
    <button class="button type--A" @click="logout">
      <div class="button__line"></div>
      <div class="button__line"></div>
      <span class="button__text">{{ $t('profilePage.logout') }}</span>
      <div class="button__drow1"></div>
      <div class="button__drow2"></div>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProfilePage',
  computed: {
    ...mapState({
      currentUser: state => state.auth.currentUser,
    }),
  },
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser() {
      this.$store.dispatch('getCurrentUser')
          .catch(error => {
            console.error('Failed to fetch user data:', error);
          });
    },
    logout() {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ name: 'login' });
          })
          .catch(error => {
            console.error('Logout failed:', error);
          });
    },
  },
};
</script>


<style scoped>
.button {
  border: none;
  outline: none;
  background: transparent;
}
.profile-info p {
  margin: 0;
  font-family: 'URW Chancery L', cursive;
}

.profile-header p {
  margin: 0;
  font-family: 'URW Chancery L', cursive;
}

.display-4 {
  font-weight: 300;
}

.profile-header {
  background-color: #383838;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.profile-info {
  color: #383838;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  padding: 20px;
}

.profile-info p {
  margin: 0;
}

.type--A {
  --line_color: #383838;
  --hover_color: #FFA500;
  --back_color: #FFECF6;
}

.button {
  display: block;
  position: relative;
  width: 100%;
  height: 50px;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  color: var(--line_color);
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  border: none;
  padding: 0;
}

.button:hover {
  color: var(--hover_color);
}

.button__text {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.button::before,
.button::after,
.button__text::before,
.button__text::after {
  content: '';
  position: absolute;
  height: 3px;
  border-radius: 2px;
  background: var(--line_color);
  transition: all .5s ease;
}

.button::before {
  top: 0;
  left: 54px;
  width: calc(100% - 56px * 2 - 16px);
}

.button::after {
  top: 0;
  right: 54px;
  width: 8px;
}

.button__text::before {
  bottom: 0;
  right: 54px;
  width: calc(100% - 56px * 2 - 16px);
}

.button__text::after {
  bottom: 0;
  left: 54px;
  width: 8px;
}

.button__line {
  position: absolute;
  top: 0;
  width: 70px;
  height: 100%;
  overflow: hidden;
  transition: background .5s ease;
}

.button__line::before {
  content: '';
  position: absolute;
  top: 0;
  width: 210%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 300px;
  border: solid 3px var(--line_color);
}

.button__line:nth-child(1),
.button__line:nth-child(1)::before {
  left: 0;
}

.button__line:nth-child(2),
.button__line:nth-child(2)::before {
  right: 0;
}

.button:hover {
  letter-spacing: 8px;
}

.button:hover::before,
.button:hover .button__text::before {
  width: 15px;
}

.button:hover::after,
.button:hover .button__text::after {
  width: calc(100% - 70px * 2 - 16px);
}

.button__drow2 {
  position: absolute;
  z-index: -1;
  border-radius: 16px;
  transform-origin: 16px 16px;
}

.button__drow1 {
  top: -16px;
  left: 40px;
  width: 32px;
  height: 0;
  transform: rotate(30deg);
}

.button__drow2 {
  top: 44px;
  left: 77px;
  width: 32px;
  height: 0;
  transform: rotate(-127deg);
}

.button__drow1::before,
.button__drow1::after,
.button__drow2::before,
.button__drow2::after {
  content: '';
  position: absolute;
}

.button__drow1::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-60deg);
}

.button__drow1::after {
  top: -10px;
  left: 45px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(69deg);
}

.button__drow2::before {
  bottom: 0;
  left: 0;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-146deg);
}

.button__drow2::after {
  bottom: 26px;
  left: -40px;
  width: 0;
  height: 32px;
  border-radius: 16px;
  transform-origin: 16px 16px;
  transform: rotate(-262deg);
}

.button__drow1,
.button__drow1::before,
.button__drow1::after,
.button__drow2,
.button__drow2::before,
.button__drow2::after {
  background: var(--back_color);
}

.button:hover .button__drow1 {
  animation: drow1 ease-in .06s;
  animation-fill-mode: forwards;
}

.button:hover .button__drow1::before {
  animation: drow2 linear .08s .06s;
  animation-fill-mode: forwards;
}

.button:hover .button__drow1::after {
  animation: drow3 linear .03s .14s;
  animation-fill-mode: forwards;
}

.button:hover .button__drow2 {
  animation: drow4 linear .06s .2s;
  animation-fill-mode: forwards;
}

.button:hover .button__drow2::before {
  animation: drow3 linear .03s .26s;
  animation-fill-mode: forwards;
}

.button:hover .button__drow2::after {
  animation: drow5 linear .06s .32s;
  animation-fill-mode: forwards;
}
</style>