<template>


    <Navbar />
  <body>
    <Menu />
  </body>

  
</template>
<script>
import Menu from '@/components/Menu.vue'
import Navbar from '@/components/Navbar.vue'

export default
{
  name: 'MenuView',
  components:
  {
    Menu,
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