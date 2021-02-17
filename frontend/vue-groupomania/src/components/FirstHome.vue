<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>Rejoignez-nous vite pour échanger et partager toujours plus avec vos collègues !</h2>
    <div class="buttons">
        <button class="btn" @click="$router.push('login')">Connexion</button>
        <button class="btn" @click="$router.push('signUp')">Inscription</button>
    </div>
    <div class="bottomImages">
        <img alt="Vue logo" src="../assets/bottomImage350.png" class="topImage">
        <img alt="Vue logo" src="../assets/bottomImage450.png" class="bottomImage">
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstHome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
    margin-top: 5.5rem;
}
.buttons {
    display: flex;
    justify-content: center;
    margin-bottom: 3.5rem;
}
.btn {
    border: 3px solid #3f3d56;
    border-radius: 25px;
    color: #3f3d56;
    font-size: 15px;
    font-weight: bold;
    padding: 0.9rem;
    margin: 1rem;
}
.btn:hover {
    border: 3px solid #ff6363;
    color: #ff6363;
}
.bottomImages {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>