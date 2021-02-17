<template>
  <div class="profile">
    <!-- <img alt="Logo Groupomania" src="../assets/iconLong450.png"> -->
    <Navbar msg="Bienvenue sur Groupomania, votre nouveau réseau social d'entreprise !"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Profile',
  components: {
    Navbar
  }
}
</script>
