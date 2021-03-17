<template>
  <div class="newPost__photo">
    <img :src="src || 'user-circle-solid.svg'" class="image" alt="Photo de profil"/>
  </div>
</template>


<script>
  export default {
    name: 'ProfileImage',
    props: ['src']
  }
</script>


<style lang="scss">
  .image {
    width: 4rem;
    border-radius: 100%;
  }
</style>