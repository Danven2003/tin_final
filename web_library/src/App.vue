<template>
  <div>
    <mcv-bar/>

    <router-view>/</router-view>
  </div>
</template>

<script>
import McvBar from '@/components/Bar.vue'

export default {
  name: 'McvApp',
  components: {
    McvBar,
  },
  mounted() {
    this.$store.dispatch('getCurrentUser')
  }
}
</script>

<style>


</style>

