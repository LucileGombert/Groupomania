<template>
  <div class="profile">
    <!-- <img alt="Logo Groupomania" src="../assets/iconLong450.png"> -->
    <Navbar msg="Bienvenue sur Groupomania, votre nouveau réseau social d'entreprise !"/>
    
    <h1>Bienvenue <span>xxx</span> !</h1>
    <div class="profile__content">
      <div class="profile__content__photo">
        <h2 class="profile__content__photo__title">Photo de profil</h2>
        <img class="profile__content__photo__img" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
        <button class="profile__content__photo__button">Changer ma photo de profil</button>
      </div>
      <div class="profile__content__info">
        <h2>Vos informations</h2>

      </div>
    </div>
    
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

<style scoped lang="scss">
.profile__content {
  display: flex;
  justify-content: center;
  &__photo, &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    background: #ffb1b1;
    margin: 1rem;
    width: 30rem;
    &__title {
      margin-bottom: 2rem;
    }
    &__img {
      width: 5rem;
    }
    &__button {
      border: 2px solid #3f3d56;
      border-radius: 25px;
      color: #3f3d56;
      font-size: 15px;
      font-weight: bold;
      padding: 0.4rem;
      margin: 1rem;
    }
  }
}
</style>