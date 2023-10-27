<template>
  <div class="home">
    <Navbar />
    <Hero />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';


export default {
  name: 'HomeView',
  components: {
    Navbar,
    Hero,
  },
  data() {
    return {
      reviews: [], // Data untuk menyimpan ulasan
    };
  },
  methods: {
    // Metode ini akan menerima ulasan dari event dan menambahkannya ke data reviews
    addReview(newReview) {
      this.reviews.push(newReview);
    },
  },
  created() {
  console.log(this.reviews);
}
};
</script>
