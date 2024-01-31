<template>
  <div>
    <div class="header">
      <div class="menu">
        <div class="navbar-brand brand-logo" @click="handleClick(0)">
          <img src="@/static/avatar.png" alt="Avatar" class="avatar-img"/>
        </div>
        <ul class="nav-items">
          <li v-for="(item, index) in menuItems" :key="index" @click="handleClick(index)"
              :class="{ 'active': index === activeIndex }">{{ $t('barPage.' + item.label) }}
          </li>
          <template v-if="isLoggedIn">
            <li v-for="(item, index) in additionalItems" :key="index + menuItems.length"
                @click="handleItemClick(index + menuItems.length)"
                :class="{ 'active': index + menuItems.length === activeIndex }">{{ $t('barPage.' + item.label) }}
            </li>
          </template>
          <template v-if="!isLoggedIn">
            <li v-for="(item, index) in guestItems" :key="index + menuItems.length + additionalItems.length"
                @click="handleItemClick(index + menuItems.length + additionalItems.length)"
                :class="{ 'active': index + menuItems.length + additionalItems.length === activeIndex }">
              {{ $t('barPage.' + item.label) }}
            </li>
          </template>
          <li class="language-dropdown">
            <select @change="changeLanguage($event.target.value)" class="language-select" :value="this.$i18n.locale">
              <option :value="language.code" v-for="language in languages" :key="language.code">{{language.name }}</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'NavigationBar',
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
    isAdmin() {
      return this.isLoggedIn && this.currentUser.user.role === 'admin';
    }
  },
  data() {
    return {
      activeIndex: 0,
      languages: [
        { code: 'en', name: 'English en' },
        { code: 'by', name: 'Беларускі by' },
        { code: 'ru', name: 'Русский ru' }

      ],
      menuItems: [],
      additionalItems: [],
      guestItems: []
    };
  },
  created() {
    this.menuItems = [
      { label: 'home', to: { name: 'globalFeed' } }
    ];
    this.additionalItems = [
      { label: 'profile', to: { name: 'profile' } }
    ];
    this.guestItems = [
      { label: 'logIn', to: { name: 'login' } },
      { label: 'register', to: { name: 'register' } }
    ];
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index;
      const route = this.menuItems[index].to;
      this.$router.push(route);
    },
    handleItemClick(index) {
      this.activeIndex = index;
      const route = this.isLoggedIn ? this.additionalItems[index - this.menuItems.length].to :
          this.guestItems[index - this.menuItems.length - this.additionalItems.length].to;
      this.$router.push(route);
    },
    changeLanguage(lang) {
      localStorage.setItem('userLanguage', lang);
      this.$i18n.locale = lang;
    }
  },
};
</script>



<style scoped>
.language-select {
  padding: 5px 30px 5px 10px;
  font-size: 16px;
  border: none;
  border-radius: 2px;
  background-color: #383838;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-family: 'American Typewriter', serif;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 20px auto;
}

.language-dropdown {
  margin-left: 10px;
}

.language-dropdown::after {
  content: '\25BC';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: white;
}

.language-select:hover {
  background-color: #606060;
}

.language-select:focus {
  outline: none;
}

.language-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  background-color: #383838;
  border: 1px solid #333;
  border-top: none;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: none;
}

.language-dropdown ul.active {
  display: block;
}

.language-dropdown ul li {
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.language-dropdown ul li:hover {
  background-color: #333;
}

.header {
  width: 100%;
  height: 75px;
  background: #383838;
  opacity: 0.95;
  overflow: hidden;
  box-shadow: #333 1px 3px 4px;
}

.menu {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.nav-items {
  list-style: none;
  display: flex;
  align-items: center;
}

ul li {
  margin: 0;
  padding: 10px 30px;
  text-align: center;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.5s ease-out;
  font-family: 'American Typewriter', serif;
}

li.active {
  color: orange;
  transform: scale(1.1);
}

@media (max-device-width: 991px) {
  .header {
    height: 64px;
  }
}

.avatar-img {
  width: 70px;
  height: 70px;
  border-radius: 30%;
  object-fit: cover;
}
</style>