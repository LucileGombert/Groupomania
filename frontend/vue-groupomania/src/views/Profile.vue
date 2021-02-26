<template>
  <div class="profile">
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
        <p>Pseudo</p>
        <div class="profile__content__info__item">test1</div>
        <p>Email</p>
        <div class="profile__content__info__item">test01@groupomania.com</div>
      </div>
    </div>
    <modale v-bind:revele="revele" v-bind:toggleModale='toggleModale'></modale>
    <button class="profile__button" v-on:click="toggleModale">Supprimer mon compte</button>
    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Modale from '@/components/Modale.vue'

export default {
  name: 'Profile',
  data(){
    return {
      revele: false
    }
  },
  components: {
    Navbar,
    Modale
  },
  methods: {
    toggleModale: function() {
      this.revele = !this.revele
    }
  }
}
</script>

<style scoped lang="scss">
.profile {
  &__content {
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
      height: 20rem;
      &__title {
        margin-bottom: 2rem;
      }
      &__img {
        width: 5rem;
        margin: 2rem 0 1rem 0;
      }
      &__button {
        border: 2px solid #3f3d56;
        border-radius: 25px;
        color: #3f3d56;
        font-size: 15px;
        font-weight: bold;
        padding: 0.4rem;
        margin: 1rem;
        &:hover {
          border: 2px solid #ff6363;
          color: #ff6363;
        }
      }
      &__item {
        background: white;
        border-radius: 10px;
        padding: 0.5rem;
        width: 15rem;
        text-align: start;
      }
    }
  }
  &__button {
    border: 3px solid #3f3d56;
    border-radius: 25px;
    color: #3f3d56;
    font-size: 15px;
    font-weight: bold;
    padding: 0.9rem;
    margin: 1rem;
    &:hover {
      border: 3px solid #ff6363;
      color: #ff6363;
    }
  }
}
</style>