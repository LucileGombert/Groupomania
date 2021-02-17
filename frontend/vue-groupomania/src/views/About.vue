<template>
  <div class="about">
    <Navbar msg="Bienvenue sur Groupomania, votre nouveau réseau social d'entreprise !"/>
    <div class="about__content">
      <div class="about__content__bloc">
        <a href="#"><i class="fas fa-info-circle"></i>Aide</a>
        <a href="#"><i class="fas fa-phone-square"></i>Contact</a>
        <a href="#"><i class="fas fa-exclamation-triangle"></i>Signaler un problème</a>
      </div>
      <div class="about__content__bloc">
        <a href="#">Mentions légales</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">Conditions générales d'utilisation</a>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'About',
  components: {
    Navbar
  }
}
</script>

<style scoped lang="scss">
.about__content {
  display: flex;
  justify-content: center;
  align-items: center;
  &__bloc {
    display: flex;
    flex-direction: column;
    border: 3px solid #3f3d56;
    border-radius: 25px;
    padding: 3rem;
    margin: 2rem;
    & a {
      padding: 2rem;
      color: #3f3d56;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #ff6363;
      }
    }
  }
}
.fas {
  padding-right: 0.5rem;
}

</style>