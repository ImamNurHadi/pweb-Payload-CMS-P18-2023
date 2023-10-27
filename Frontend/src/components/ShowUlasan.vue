<template>
    <div class="bg-white p-4 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-2">Ulasan Pelanggan</h2>
      <div v-for="(review, index) in reviews" :key="index" class="mb-4">
        <h3 class="text-xl font-semibold">{{ review.title }}</h3>
        <p class="text-gray-600 mb-2">{{ review.content }}</p>
        <div class="flex items-center">
          <span class="text-yellow-400 mr-2">⭐</span>
          <span>{{ review.rating }} Bintang</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reviewTitle: "",
        reviewContent: "",
        reviewRating: 1,
        reviews: JSON.parse(localStorage.getItem('reviews') || '[]') 
      };
    },
    methods: {
  submitReview() {
    const newReview = {
      title: this.reviewTitle,
      content: this.reviewContent,
      rating: this.reviewRating
    };
   
    this.$emit('review-submitted', newReview);
    this.reviews.push(newReview);
    // Reset formulir ulasan
    this.reviewTitle = "";
    this.reviewContent = "";
    this.reviewRating = 1;
   
    this.SaveReview();
  },
  SaveReview() {
    // Menyimpan ulasan ke local storage
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
    alert('Ulasan berhasil disimpan.');
  }
}
  };
  </script>
  
  <style scoped>
  input, textarea, select {
    border-color: black;
    border-width: 0.1vh;
  }
  </style>
  