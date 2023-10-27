<template>


    <Navbar />
  <body>
    <Ulasan />
  </body>

  
</template>
<script>
import Ulasan from '@/components/Ulasan.vue'
import Navbar from '@/components/Navbar.vue'

export default
{
  name: 'MenuView',
  components:
  {
    Ulasan,
    Navbar
  }
  
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