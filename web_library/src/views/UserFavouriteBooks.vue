<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-if="error">Something went wrong: {{ error }}</div>

    <div v-if="like_book">
      <section class="product">
        <div class="product-container">
          <div v-for="(book, index) in like_book.favouriteBooks" :key="index" class="product-card">
            <div class="product-wrapper">
              <div class="product-image">
                <img :src="book.Book.image" class="product-thumb" alt="">
              </div>
              <div class="product-copy" :style="{ color: '#383838' }">
                <div class="category">
                  <span style="color: #FFFFFF;">{{ book.Book.category }}</span>
                </div>
                <div class="title-product">
                  <h3 style="color: #FFFFFF;">{{ book.Book.name }}</h3>
                </div>
                <div class="description-prod">
                  <p style="color: #FFFFFF;">{{ book.Book.description }}</p>
                </div>
                <div class="card-footer">
                  <div class="wcf-left"><span class="price" style="color: #FFFFFF;">${{ book.Book.price }}</span></div>
                  <div class="wcf-right">
                    <router-link :to="{ name: 'article', params: { slug: book.Book.id }}" class="btn">
                      <i class="zmdi zmdi-shopping-basket"></i> {{$t('feedPage.readMore')}}
                    </router-link>
                    <button @click="deleteFavouriteBook(book.Book.id)" class="btn">{{$t('feedPage.delete')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {limit} from "@/helpers/constants";

export default {
  name: 'McvUserFeed',
  data() {
    return {
      total: 0,
      limit,
      url: '/like_book/',
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.like_book.isLoading,
      like_book: state => state.like_book.data,
      error: state => state.like_book.error
    }),
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      this.$store.dispatch('getLikedBooks', {}).then(result => {
        console.log("resul", result)
        console.log("feeed", this.like_book)
        console.log("isLoading", this.isLoading)
      });
    },
    deleteFavouriteBook(bookId) {
      this.$store.dispatch('deleteLikedBooks', bookId)
          .then(() => {
            this.fetchFeed();
          })
          .catch(error => {
            console.error('Error deleting favourite book:', error);
          });
    }
  }
}
</script>

<style scoped>
body {
  background-color: #ffffff;
  color: #FFA500;
  font-family: 'Bentham', serif;
  margin: 0;
  padding: 0;
}

.product {
  position: relative;
  background: #ffffff;
  overflow: hidden;
  padding: 20px 0;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: 80%;
  margin: 0 auto;
}

.product-card {
  position: relative;
  background: #383838;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  flex: 0 0 calc(33.33% - 20px);
  margin-bottom: 20px;
}

.product-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-copy {
  background-color: #383838;
  border-radius: 0 0 8px 8px;
  padding: 20px;
}

.category {
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 10px;
}

.title-product {
  margin-bottom: 10px;
}

.description-prod {
  margin-bottom: 20px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.5rem;
}

.btn {
  color: orange;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #79b0a1;
}
</style>
