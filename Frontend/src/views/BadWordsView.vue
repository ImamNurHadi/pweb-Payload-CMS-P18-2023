<template>


    <Navbar />
  <body>
    <div class="bad-word-view">
    <BadWord :badWordsDetected="badWordsDetected" />
    <!-- Komponen lainnya di sini -->
  </div>
  </body>

  
</template>
<script>
import BadWord from '@/components/BadWord.vue'
import Navbar from '@/components/Navbar.vue'

export default
{
  name: 'MenuView',
  components:
  {
    BadWord,
    Navbar
  },
  data() {
    return {
      badWordsDetected: false
    };
  },
}
</script>
<style>
    *
    {
      margin: 0;
      padding: 0;
    }
    body
    {
      background-color:white;
    }

</style>