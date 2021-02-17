<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <img alt="Logo Groupomania" src="../assets/iconLong450.png">
    <FirstHome msg="Bienvenue sur Groupomania, votre nouveau réseau social d'entreprise !"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import FirstHome from '@/components/FirstHome.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    FirstHome
  }
}
</script>
