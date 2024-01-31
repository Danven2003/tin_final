<template>
  <div class="card">
    <nav @click="goBack" class="back-button">
      <svg class="arrow" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve"
           xmlns="http://www.w3.org/2000/svg">
        <polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " stroke="#727272"/>
      </svg>
      {{ $t('createArticlePage.createArticle.backToAll') }}
    </nav>

    <div class="photo">
      <div v-if="previewImage || bookDefaultPhoto">
        <div class="photo-frame">
          <img :src="previewImage || bookDefaultPhoto" alt="Preview" class="photo-preview">
        </div>
      </div>
    </div>

    <div class="edit">
      <form @submit.prevent="createBook">

        <div class="input-container">
          <label for="title">{{ $t('createArticlePage.createArticle.titleLabel') }}:</label>
          <p class="error-msg">{{ getErrorMessage('title') }}</p>
          <input v-model="book.title" type="text" id="title" name="title" required class="input-field">
        </div>

        <div class="input-container">
          <label for="description">{{ $t('createArticlePage.createArticle.descriptionLabel') }}:</label>
          <p class="error-msg">{{ getErrorMessage('description') }}</p>
          <input v-model="book.description" type="text" id="description" name="description" rows="4" required
                 class="input-field">
        </div>

        <div class="input-container">
          <label for="price">{{ $t('createArticlePage.createArticle.priceLabel') }}:</label>
          <p class="error-msg">{{ getErrorMessage('price') }}</p>
          <input v-model="book.price" type="text" id="price" name="price" required class="input-field">
        </div>

        <div class="input-container">
          <label for="image">{{ $t('createArticlePage.createArticle.imageLabel') }}:</label>
          <p class="error-msg">{{ getErrorMessage('image') }}</p>
          <input type="file" id="image" name="image" accept="image/*" required @change="handleFileChange"
                 class="input-field">
        </div>

        <div class="input-container">
          <label for="contact_email">{{ $t('createArticlePage.createArticle.emailLabel') }}:</label>
          <p class="error-msg">{{ getErrorMessage('contact_email') }}</p>
          <input v-model="book.contact_email" type="email" id="contact_email" name="contact_email" required
                 class="input-field">

        </div>

        <div class="input-container">
          <label for="contact_phone">{{ $t('createArticlePage.createArticle.phoneLabel') }}:</label>
          <p class="error-msg">{{ getErrorMessage('contact_phone') }}</p>
          <input v-model="book.contact_phone" type="tel" id="contact_phone" name="contact_phone" required
                 class="input-field">

        </div>

        <button type="submit" class="submit-button">{{ $t('createArticlePage.createArticle.createButton') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateArticleMvc',
  data() {
    return {
      book: {
        title: '',
        description: '',
        price: '',
        image: null,
        contact_email: '',
        contact_phone: '',
      },
      previewImage: null,
      bookDefaultPhoto: require('@/static/R.png'),
      validationErrors: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    createBook() {
      if (this.validateForm()) {
        const formData = new FormData();
        formData.append('title', this.book.title);
        formData.append('description', this.book.description);
        formData.append('price', this.book.price);
        formData.append('contact_email', this.book.contact_email);
        formData.append('contact_phone', this.book.contact_phone);
        formData.append('image', this.book.image); // Append the image file

        this.$store
            .dispatch('createArticle', formData)
            .then(() => {
              this.$router.push({ name: 'globalFeed' });
            })
            .catch(error => {
              console.error('Error creating article:', error);
            });
      }
    },
    handleFileChange(event) {
      this.book.image = event.target.files[0];
      this.book.previewImage = this.getBase64Image(this.book.image);
    },
    getBase64Image(img) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        this.previewImage = reader.result;
      };
    },
    validateForm() {
      this.validationErrors = [];

      if (!this.book.title || !this.book.description || !this.book.price || !this.book.image || !this.book.contact_email || !this.book.contact_phone) {
        this.validationErrors.push(this.$t('createArticlePage.createArticleError.allFieldsRequired'));
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(this.book.contact_email)) {
          this.validationErrors.push(this.$t('createArticlePage.createArticleError.invalidEmail'));
        }

        if (this.book.price <= 0) {
          this.validationErrors.push(this.$t('createArticlePage.createArticleError.invalidPrice'));
        }

        if (this.book.description.length < 10) {
          this.validationErrors.push(this.$t('createArticlePage.createArticleError.invalidDescription'));
        }

        if (this.book.title.length < 3) {
          this.validationErrors.push(this.$t('createArticlePage.createArticleError.invalidTitle'));
        }

        if (this.book.contact_phone.length < 9) {
          this.validationErrors.push(this.$t('createArticlePage.createArticleError.invalidContactPhone'));
        }
      }

      return this.validationErrors.length === 0;
    },
    getErrorMessage(field) {
      if (this.validationErrors.includes(this.$t('createArticlePage.createArticleError.allFieldsRequired'))) {
        return this.$t('createArticlePage.createArticleError.allFieldsRequired');
      }
      switch (field) {
        case 'title':
          return this.validationErrors.find(error => error.startsWith(this.$t('createArticlePage.createArticleError.invalidTitle'))) || '';
        case 'description':
          return this.validationErrors.find(error => error.startsWith(this.$t('createArticlePage.createArticleError.invalidDescription'))) || '';
        case 'price':
          return this.validationErrors.find(error => error.startsWith(this.$t('createArticlePage.createArticleError.invalidPrice'))) || '';
        case 'image':
          return '';
        case 'contact_email':
          return this.validationErrors.find(error => error.startsWith(this.$t('createArticlePage.createArticleError.invalidEmail'))) || '';
        case 'contact_phone':
          return this.validationErrors.find(error => error.startsWith(this.$t('createArticlePage.createArticleError.invalidContactPhone'))) || '';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.input-container {
  position: relative;
  margin-bottom: 15px;
}

.error-msg {
  position: absolute;
  top: -20%;
  left: 30%;
  color: #e24c4b !important;
  font-size: 12px;
}

.input-container input[type="text"],
.input-container input[type="email"],
.input-container input[type="password"],
.input-container input[type="tel"] {
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #383838;
  background-color: #fff;
  outline: none;
  font-size: 14px;
  color: #383838;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input-container input:focus {
  border-color: #ff9900;
}

* {
  box-sizing: border-box;
}

body {
  background: #aedaa6;
  font-family: "Raleway";
}

.card {
  width: 95%;
  height: 145%;
  position: absolute;
  background: white;
  margin: 0 auto;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.3s;

  &:hover {
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

    svg.heart {
      height: 24px;
      width: 24px;
      float: right;
      margin-top: -3px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        fill: red;
      }
    }

    svg.arrow {
      float: left;
      height: 15px;
      width: 15px;
      margin-right: 10px;
    }
  }

  .edit {
    padding: 20px;
    float: left;
    width: 55%;
    height: 100%;
    border-left: 2px solid #efefef;

    h1,
    h2,
    h4,
    p,
    button {
      color: #000;
    }

    h1 {
      font-weight: 300;
      padding-top: 10px;
      margin: 0;
      font-size: 24px;
    }

    h2 {
      margin: 0;
      text-transform: uppercase;
      font-weight: 500;
    }

    h4 {
      margin: 0;
      font-size: 12px;
    }

    p {
      font-size: 10px;
      line-height: 18px;
      padding: 15px 0;
      margin: 0;
    }

    button {
      outline: 0;
      border: 0;
      background: none;
      border: 1px solid #d9d9d9;
      padding: 6px 12px;
      text-transform: uppercase;
      font-family: inherit;
      margin-bottom: 20px;
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 12px;

      &:hover {
        color: #aedaa6;
        cursor: pointer;
      }
    }
  }

  .photo {
    padding: 5%;
    width: 30%;
    height: 100%;
    text-align: center;
    float: left;
    background-color: #383838;
    overflow: hidden;
  }

  .photo-preview {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid orange;
  }

  .input-field {
    width: calc(100% - 16px);
    padding: 6px;
    margin-top: 4px;
    margin-bottom: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 12px;
  }

  .submit-button {
    outline: 0;
    border: 0;
    background-color: #383838;
    color: orange;
    padding: 6px 12px;
    text-transform: uppercase;
    font-family: inherit;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 12px;

    &:hover {
      color: #aedaa6;
      cursor: pointer;
    }
  }
}


</style>