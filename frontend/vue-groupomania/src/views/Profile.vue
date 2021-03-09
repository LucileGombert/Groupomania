<template>
  <div class="profile">
    <Navbar/>
    <div>
      <h1 v-if="user">Bienvenue {{ user.username }} !</h1>
      <h1 v-if="!user">Bienvenue !</h1>
      <div class="profile__content">
        <div class="profile__content__photo">
          <h2 class="profile__content__photo__title">Photo de profil</h2>
          <img class="profile__content__photo__img" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
          <button class="profile__smallButton">Changer ma photo de profil</button>
        </div>
        <div class="profile__content__info">
          <h2>Vos informations</h2>
          <p>Pseudo</p>
          <div class="profile__content__info__item">{{ user.username }}</div>
          <p>Email</p>
          <div class="profile__content__info__item">{{ user.email }}</div>
          <ModaleUpdateProfile v-bind:revele="revele" v-bind:toggleModaleUpdate='toggleModaleUpdate'></ModaleUpdateProfile>
          <button class="profile__smallButton" v-on:click="toggleModaleUpdate"><i class="far fa-edit"></i></button>
        </div>
      </div>
      <ModaleDeleteAccount v-bind:revele="revele" v-bind:toggleModale='toggleModale'></ModaleDeleteAccount>
      <button class="profile__bigButton" v-on:click="toggleModale">Supprimer mon compte</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import ModaleDeleteAccount from '@/components/ModaleDeleteAccount.vue'
import ModaleUpdateProfile from '@/components/ModaleUpdateProfile.vue'

export default {
  name: 'Profile',
  data(){
    return {
      revele: false,
      user: ""
    }
  },
  // created() {
  //   this.displayUser();
  // },
  components: {
    Navbar,
    ModaleDeleteAccount,
    ModaleUpdateProfile
  },
  methods: {
    toggleModale: function() {
      this.revele = !this.revele
    },
    toggleModaleUpdate: function() {
      this.revele = !this.revele
    }
  },
  async created() {
    const userId = localStorage.getItem('userId');

    
    const response = await axios.get('http://localhost:3000/api/user/' + userId, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    });
    this.user = response.data;
  },
  // displayUser() {
  //   const id = localStorage.getItem('userId');
  //   axios.get('http://localhost:3000/api/user/' + id, {
  //     headers: {
  //     Authorization: 'Bearer ' + localStorage.getItem('token')
  //     }
  //   })
  //   .then(reponse => {
  //       this.user.push(reponse.data);
  //   })
  // }
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
      &__item {
        background: white;
        border-radius: 10px;
        padding: 0.5rem;
        width: 15rem;
        text-align: start;
      }
    }
  }
  &__smallButton {
    border: 2px solid #3f3d56;
    border-radius: 25px;
    color: #3f3d56;
    font-size: 15px;
    font-weight: bold;
    padding: 0.4rem;
    margin: 1rem;
    outline-style: none;
    &:hover {
      border: 2px solid #ff6363;
      color: #ff6363;
    }
  }
  &__bigButton {
    border: 3px solid #3f3d56;
    border-radius: 25px;
    color: #3f3d56;
    font-size: 15px;
    font-weight: bold;
    padding: 0.9rem;
    margin: 1rem;
    outline-style: none;
    &:hover {
      border: 3px solid #ff6363;
      color: #ff6363;
    }
  }
}
</style>