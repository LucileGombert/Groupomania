<template>
  <div>
    <Navbar/>
    <div>
      <h1 v-if="user">Bienvenue {{ user.username }} !</h1>
      <div class="profile">
        <h2>Vos informations</h2>

        <div class="profile__photo">
          <ProfileImage :src="url || user.imageProfile" class="profile__photo__image"/>

          <div class="profile__photo__modify">
              <label for="file-input">
                <i @click="uploadFile" class="far fa-edit profile__photo__modify__iconButton"></i>
              </label>
              <input type="file" @change="onFileSelected"  accept="image/*" id="file-input">
          </div>
        </div>
                        
        <div class="profile__info">
          <p class="profile__info__title">Pseudo</p>
          <div class="profile__info__text">{{ user.username }}</div>
          <p class="profile__info__title">Email</p>
          <div class="profile__info__text">{{ user.email }}</div>
        </div>

        <button @click="modifyProfile" class="profile__smallButton">Enregister</button>
      </div>
      <ModaleDeleteAccount v-bind:revele="revele" v-bind:displayModale='displayModale'/>
      <button class="profile__bigButton" v-on:click="displayModale">Supprimer mon compte <i class="far fa-trash-alt"></i></button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Navbar from '@/components/Navbar.vue'
  import ModaleDeleteAccount from '@/components/ModaleDeleteAccount.vue'

  import ProfileImage from '../components/ProfileImage'

  export default {
    name: 'Profile',
    data(){
      return {
        revele: false,
        user: "",
        imageProfile: null,
        url: null,
      }
    },
    components: {
      Navbar,
      ModaleDeleteAccount,
      // UpdateProfile
      ProfileImage,
    },
    methods: {
      uploadFile () {
        this.$refs.fileUpload.click()
      },
      onFileSelected(event) {
        this.imageProfile = event.target.files[0]
      },
      modifyProfile() {
        var formData = new FormData();
        formData.append("image", this.imageProfile);

        const userId = localStorage.getItem('userId');
        // console.log(this.imageProfile);
        axios.put('http://localhost:3000/api/user/' + userId, formData, {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
          alert("Votre profil a bien été modifié !");
          window.location.reload()
        })
        .catch(error => {
          // const msgerror = error.response.data
          // alert(msgerror.error)
          console.log(error);
        })
      },
      displayModale() {
        this.revele = !this.revele
      },
    },
    async created() {
      const userId = localStorage.getItem('userId');

      const response = await axios.get('http://localhost:3000/api/user/' + userId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      this.user = response.data;
      localStorage.setItem('imageProfile', response.data.imageProfile);
      console.log('image profil', response.data.imageProfile);
    }
  }
</script>

<style scoped lang="scss">
  h1, h2 {
    margin-top: 2rem;
  }
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 40%;
    max-width: 60%;
    margin: 3rem auto;
    background: #ffb1b1;
    border-radius: 25px;
    @media (max-width: 500px) {
      min-width: 80%;
    }
    &__photo {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      &__image {
        margin-right: 1rem;
      }
      &__modify>input {
        display: none; 
      }
      &__modify__iconButton:hover {
        color: white;
        cursor: pointer;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      text-align: left;
      margin: 1rem;
      &__title {
        font-weight: bold;
        margin: 1rem 0 0.4rem 0;
      }
      &__text {
        background: white;
        border-radius: 10px;
        padding: 0.5rem;
        width: 15rem;
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
      background: white;
      &:hover {
        color: #ff6363;
        cursor: pointer;
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
        cursor: pointer;
      }
    }
  }
</style>