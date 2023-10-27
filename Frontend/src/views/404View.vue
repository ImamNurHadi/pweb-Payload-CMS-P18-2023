<template>
    <div class="home">
      <NotFound/>
      
    </div>
  </template>
  <script>
  import NotFound from '@/components/NotFound.vue'
  
  export default
  {
    name: '404View',
    components:
    {
      NotFound
    }
  }
  </script>