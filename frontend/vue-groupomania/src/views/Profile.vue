<template>
  <div>
    <Navbar/>
    <div>
      <h1 v-if="user">Bienvenue {{ user.username }} !</h1>
      <div class="profile">
        <h2>Vos informations</h2>

        <ProfileImage :src="url || user.imageProfile" class="profile__image"/>
        <!-- <img :src="url || user.imageProfile || 'user-circle-solid.svg'" class="image" alt="Photo de profil"/> -->
        
        <div class="profile__info">
          <p class="profile__info__title">Pseudo</p>
          <div class="profile__info__text">{{ user.username }}</div>
          <p class="profile__info__title">Email</p>
          <div class="profile__info__text">{{ user.email }}</div>
        </div>
        <div class="profile__modify">
          <form method="post" enctype="multipart/form-data">
            <label for="file">
              <!-- <i @click="uploadFile" class="far fa-edit fa-2x profile__iconButton"></i> -->
              <input type="file" @change="fileUpload" ref="file" accept="image/*" name="file" id="file">
            </label>
            <!-- <input type="file" @change="onFileSelected" ref="fileUpload" accept="image/*" name="file" id="file"> -->
            <!-- <button @click="modifyProfile" class="profile__smallButton">Enregister</button> -->
            <button @click="submitFile" class="profile__smallButton">Enregister</button>
          </form>
          
        </div>
        <!-- <UpdateProfile v-bind:revele="revele" v-bind:displayModale='displayModale'/> -->
        <!-- <button class="profile__smallButton" @click="modifyProfile"><i class="far fa-edit"></i></button>  -->
      </div>
      <ModaleDeleteAccount v-bind:revele="revele" v-bind:displayModale='displayModale'/>
      <button class="profile__bigButton" v-on:click="displayModale">Supprimer mon compte</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import ModaleDeleteAccount from '@/components/ModaleDeleteAccount.vue'
// import UpdateProfile from '@/components/UpdateProfile.vue'
import ProfileImage from '../components/ProfileImage'

export default {
  name: 'Profile',
  data(){
    return {
      revele: false,
      user: "",
      selectedFile: null,
      url: null,
      imageProfile: '',
      file: ''
    }
  },
  components: {
    Navbar,
    ModaleDeleteAccount,
    // UpdateProfile
    ProfileImage,
  },
  methods: {
    fileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      let formData = new FormData();
      formData.append('file', this.file);

      const userId = localStorage.getItem('userId');
      axios.put('http://localhost:3000/api/user/' + userId, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      })
      .then(() => {
          alert("Votre profil a bien été modifié !");
      })
      .catch(error => {
          alert(JSON.stringify(error.response.data))
      })
    },



    displayModale() {
      this.revele = !this.revele
    },
    uploadFile () {
      this.$refs.fileUpload.click()
    },
    onFileSelected(event) {
      this.url = URL.createObjectURL(event.target.files[0])
      this.selectedFile = event.target.files[0]
    },
    modifyProfile() {
      const userId = localStorage.getItem('userId');
      axios.put('http://localhost:3000/api/user/' + userId, {
          imageProfile: this.imageProfile,
      },{
          headers: {
              'Content-Type' : 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      })
      .then(() => {
          alert("Votre profil a bien été modifié !");
      })
      .catch(error => {
          alert(JSON.stringify(error.response.data))
      })
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
    console.log('user', response.data.imageProfile);
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
    &__image {
      margin-top: 1rem;
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
    &__modify>input {
      display: none; 
    }
    &__iconButton:hover {
        color: white;
        cursor: pointer;
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
  .image {
    width: 4rem;
    border-radius: 100%;
  }
</style>