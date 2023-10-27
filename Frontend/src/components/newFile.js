export default (await import('vue')).defineComponent({
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
rating: this.reviewRating,

axios, : .post('/api/validate-text', { text: this.reviewContent })
.then(response => {
// Memeriksa status respons dari server
if (response.status === 200) {
// Jika teks valid, lanjutkan dengan mengirim ulasan
this.$emit('review-submitted', newReview);
this.SaveReview();
alert('Ulasan berhasil disimpan.');
} else if (response.status === 403) {
// Jika mengandung kata-kata buruk, tampilkan halaman pesan kesalahan
this.$router.push('/kata-kata-buruk');
}
})
.catch(error => {
console.error('Error:', error);
})
};
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
});
