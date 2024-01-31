<template>
  <div class="card">
    <nav @click="goBack" class="back-button">
      <svg class="arrow" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve"
           xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " stroke="#727272"/>
      </svg>
      {{ $t('articlePage.backToAll') }}
    </nav>
    <div class="photo">
      <img :src="article.book.image" width="250" height="300">
    </div>
    <div class="edit">
      <h3 class="book-title"> {{ $t('articlePage.title') }}: {{ article.book.title }}</h3>
      <div class="book-info">
        <div class="info-item">
          <span class="info-label"> {{ $t('articlePage.price') }}: {{ article.book.price }}$</span>
        </div>
        <div class="info-item">
          <span class="info-label"> {{ $t('articlePage.description') }}:</span>
          <p class="info-value">{{ article.book.description }}</p>
        </div>
        <div class="info-item">
          <span class="info-label"> {{ $t('articlePage.contactInformation') }}</span>
          <ul>
            <li><strong>{{ $t('articlePage.email') }}:</strong> {{ article.book.contact_email }}</li>
            <li><strong>{{ $t('articlePage.phone') }}:</strong> {{ article.book.contact_phone }}</li>
          </ul>
        </div>
      </div>
      <button v-if="!article.isLiked" @click="likeBook" class="button type--A">
        <div class="button__line"></div>
        <div class="button__line"></div>
        <span class="button__text">{{ $t('articlePage.likeBook') }}</span>
        <div class="button__drow1"></div>
        <div class="button__drow2"></div>
      </button>
      <span v-else>{{ $t('articlePage.bookInFavourites') }}</span>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'McvArticle',
  computed: mapState({
    isLoading: state => state.article.isLoading,
    error: state => state.article.error,
    article: state => state.article.data,
    user: state => state.data.currentUser
  }),
  mounted() {
    this.$store.dispatch('getArticle', {slug: this.$route.params.slug});
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    likeBook() {
      if (!this.article || !this.article.book) {
        return;
      }
      const bookId = this.article.book.id;
      this.$store.dispatch('likeBook', {book_id: bookId})
          .then(() => {
            window.location.reload();
          })
    },
  }
}
</script>


<style scoped>
.book-info {
  margin-top: 20px;
  font-family: 'Avantgarde', 'TeX Gyre Adventor', 'URW Gothic L', sans-serif;
}

.info-item {
  margin-bottom: 20px;
}

.info-label {
  font-weight: bold;
  color: #383838;
  display: block;
}

.info-value {
  color: #666;
}

.info-value p {
  font-size: 14px;
  line-height: 1.6;
}

.info-value ul {
  list-style: none;
  padding: 0;
}

.info-value ul li {
  margin-top: 8px;
}

.info-value ul li strong {
  color: #383838;
}

.type--A {
  --line_color: #383838;
  --hover_color: #FFA500;
  --back_color: #FFECF6;
}

.button {
  display: block;
  position: relative;
  width: 60%;
  height: 40px;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
  color: var(--line_color);
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  padding: 0;
  border: none !important;
  outline: none !important;
  background: transparent !important;
  box-shadow: none !important;
  margin: 0 !important;
  border-radius: 0 !important;
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

.button:hover .button__text {
  color: orange;
}

.button:hover::before,
.button:hover .button__text::before {
  width: 15px;
}

.button:hover::after,
.button:hover .button__text::after {
  width: calc(100% - 70px * 2 - 16px);
}

.button__drow2,
.button__drow1 {
  position: absolute;
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

* {
  box-sizing: border-box;
}

body {
  background: #aedaa6;
}

.card {
  width: 95%;
  height: 80%;
  position: absolute;
  background: white;
  margin: 0 auto;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.3s;
}

.card:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

nav {
  width: 100%;
  color: #000;
  text-transform: uppercase;
  padding: 20px;
  border-bottom: 2px solid #efefef;
  font-size: 12px;
  display: inline-block;
}

nav svg.arrow {
  float: left;
  height: 15px;
  width: 15px;
  margin-right: 10px;
}

.photo {
  padding: 4%;
  width: 30%;
  height: 88%;
  text-align: center;
  float: left;
  background-color: #383838;
  overflow: hidden;
}

.photo img {
  max-height: 240px;
  border-radius: 10px;
  border: 1px solid orange;
}

.edit {
  padding: 30px;
  float: left;
  width: 55%;
  border-left: 2px solid #efefef;
}

.edit h1 {
  font-weight: 300;
  padding-top: 15px;
  margin: 0;
  font-size: 30px;
}

.edit h2 {
  margin: 0;
  text-transform: uppercase;
  font-weight: 500;
}

.edit h4 {
  margin: 0;
  font-size: 12px;
}

.edit p {
  font-size: 12px;
  line-height: 20px;
  padding: 20px 0;
  margin: 0;
}

.edit button {
  outline: 0;
  background: none;
  border: 1px solid #d9d9d9;
  padding: 8px 15px;
  text-transform: uppercase;
  font-family: inherit;
  margin-bottom: 30px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.edit button:hover {
  color: #aedaa6;
  cursor: pointer;
}

</style>
