<template>
    <div v-if="badWordsDetected" class="error-message">
      Maaf, ulasan Anda mengandung kata-kata buruk.
    </div>
  </template>
  
  <script>
  export default {
    props: {
      badWordsDetected: {
        type: Boolean,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .error-message {
    color: red;
    font-weight: bold;
  }
  </style>
  