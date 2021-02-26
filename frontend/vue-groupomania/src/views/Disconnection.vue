<template>
  <div class="disconnection">
    <Navbar msg="Bienvenue sur Groupomania, votre nouveau réseau social d'entreprise !"/>
    <div class="disconnection__bloc">
        <h1>Souhaitez-vous vraiment vous déconnecter ?</h1>
        <button class="disconnection__bloc__button" @click="$router.push('http://localhost:8080/')">Oui, je me déconnecte</button>    
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Disconnection',
  components: {
    Navbar
  }
}
</script>

<style scoped lang="scss">
.disconnection__bloc {
    width: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 3px solid #3f3d56;
    border-radius: 25px;
    padding: 3rem;
    margin: auto;
    margin-top: 5rem;
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
.fas {
  padding-right: 0.5rem;
}

</style>