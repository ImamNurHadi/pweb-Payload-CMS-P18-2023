<template>
    <div class="container mx-auto p-4">
      <div class="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
        <h1 class="text-3xl font-bold mb-4">Ulasan Produk</h1>
        <form @submit.prevent="submitReview" class="custom-form">
          <div class="mb-4">
            <label for="reviewTitle" class="block text-sm font-medium text-gray-600">Judul Ulasan</label>
            <input v-model="reviewTitle" type="text" id="reviewTitle" class="form-input mt-1 block w-full rounded-md pl-3">
          </div>
          <div class="mb-4">
            <label for="reviewContent" class="block text-sm font-medium text-gray-600">Isi Ulasan</label>
            <textarea v-model="reviewContent" id="reviewContent" class="form-textarea mt-1 block w-full rounded-md pl-3"></textarea>
          </div>
          <div class="mb-4">
            <label for="reviewRating" class="block text-sm font-medium text-gray-600">Rating</label>
            <select v-model.number="reviewRating" id="reviewRating" class="form-select mt-1 block w-full rounded-md">
              <option value="1">1 Bintang</option>
              <option value="2">2 Bintang</option>
              <option value="3">3 Bintang</option>
              <option value="4">4 Bintang</option>
              <option value="5">5 Bintang</option>
            </select>
          </div>
          <button type="SaveReview" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">Kirim Ulasan</button>
        </form>
      </div>
  
            <div v-for="(review, index) in reviews" :key="index" class="mb-4">
                <h3 class="text-xl font-semibold">{{ review.title }}</h3>
                <p class="text-gray-600 mb-2">{{ review.content }}</p>
                <div class="flex items-center">
                    <span class="text-yellow-400 mr-2">⭐</span>
                    <span>{{ review.rating }} Bintang</span>
                    <button @click="deleteReview(index)" class="ml-4 text-red-500">Hapus</button>
                </div>
            </div>


    </div>
  </template>
  
  <script>

  import axios from 'axios';
  export default {
    data() {
      return {
        reviewTitle: "",
        reviewContent: "",
        reviewRating: 1,
        reviews: JSON.parse(localStorage.getItem('reviews') || '[]') // Mendapatkan ulasan dari local storage saat komponen dimuat
      };
    },
    methods: {
  submitReview() {
    const newReview = {
      title: this.reviewTitle,
      content: this.reviewContent,
      rating: this.reviewRating
      };

      axios.post('/api/validate-text', { text: this.reviewContent })
      .then(response => {
        // Memeriksa status respons dari server
        if (response.status === 200) {
          // Jika teks valid, lanjutkan dengan mengirim ulasan
          this.$emit('review-submitted', newReview);
          this.SaveReview();
          alert('Ulasan berhasil disimpan.');
        } else if (response.status === 403) {
          // Jika mengandung kata-kata buruk, tampilkan halaman pesan kesalahan
          this.$router.push('/badword');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // Mengirim ulasan baru ke komponen induk menggunakan emit
    this.$emit('review-submitted', newReview);
    // Menyimpan ulasan baru ke array ulasan lokal
    this.reviews.push(newReview);
    // Reset formulir ulasan
    this.reviewTitle = "";
    this.reviewContent = "";
    this.reviewRating = 1;
  
    this.SaveReview();
    alert('Ulasan berhasil disimpan.');
  },

  deleteReview(index) {
    // Hapus ulasan dari data reviews berdasarkan indeks
    this.reviews.splice(index, 1);
    // Simpan ulasan ke local storage setelah dihapus
    this.SaveReview();
    alert('Ulasan berhasil dihapus.');

  },
  
  SaveReview() {
    // Menyimpan ulasan ke local storage
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
    
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
  