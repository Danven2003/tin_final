<template>
  <div class="home-page">
    <div class="row">
      <div class="col-mod-9">
        <mcv-feed :api-url="apiUrl"></mcv-feed>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'

export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed
  },
  data() {
    return {
      apiUrl: "/books"
    }
  }
}
</script>