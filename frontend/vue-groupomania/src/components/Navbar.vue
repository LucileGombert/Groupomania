<template>  
    <div id="app">
        <div id="nav">
            <img class="logo" alt="Logo Groupomania" src="../assets/iconLong450.png">
            <div class="navLink">
                <router-link to="/post" class="link">Accueil</router-link> 
                <router-link to="/profile" class="link">Mon profil</router-link>
                <!-- <router-link to="/about" class="link"><i class="far fa-question-circle fa-2x"></i></router-link> -->
                <router-link to="/disconnection" class="link"><i class="fas fa-sign-out-alt fa-2x"></i></router-link>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">
.logo {
    display: flex;
    justify-content: flex-start;
}
#nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    border-bottom: 3px dashed #3f3d56;
    a {
    font-weight: bold;
    color: #3f3d56;
    &.router-link-exact-active {
      color: #ff6363;
    }
  }
}
.navLink {
    padding: 2rem;
    display: flex;
    align-items: center;
}
.link {
    padding-right: 4rem;
    text-decoration: none;
}
</style>