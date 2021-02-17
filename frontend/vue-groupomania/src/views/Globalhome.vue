<template>  
    <div id="app">
        <!-- <div id="nav">
            <img class="logo" alt="Logo Groupomania" src="../assets/iconLong450.png">
            <div class="navLink">
                <router-link to="/globalhome" class="link">Accueil</router-link> 
                <router-link to="/profile" class="link">Mon profil</router-link>
                <router-link to="/about" class="link">About</router-link>
            </div>
        </div> -->
        <Navbar msg="Bienvenue sur Groupomania, votre nouveau réseau social d'entreprise !"/>
        <h1>Fil d'actualité</h1>
        <button v-on:click="toggleModale" class="btn"><i class="fas fa-plus"></i>Créer une nouvelle publication</button>
        <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
        <router-view/>
    </div>
</template>



<script>
import Navbar from '@/components/Navbar.vue'
import Modale from '@/components/Modale.vue'
// import Modale from '../components/Modale.vue'

export default {
    name: 'Globalhome',
    data(){
      return {
        revele: false
      }
    },
    components: {
        Navbar, Modale
    },
    methods: {
        toggleModale: function() {
            this.revele = !this.revele
        }
    }

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
}
.navLink {
    padding: 2rem;
}
.link {
    padding-right: 4rem;
}
#surcouche{
display: none;
position: fixed;               
top: 0; right:0; bottom:0; left: 0;
background-color: rgba(255, 255, 255, 0.7);
z-index : 1000;
}
#case{
    display : none;
}
#case:checked + #surcouche{
    display: block;
}
label{
    cursor: pointer;
}
.labelButon{
    padding: 5px 10px;
    background-color: #3636A3;
    color : #fff;
    position: relative;
    top: 180px;
    left :220px;
    z-index: 1005;
     
}
#msgbox{
    width: 300px;
    height: 200px;
    padding: 15px;
    position: absolute;
    top: 25%;
    left: 34%;
    background-color: white;
    border: 10px solid #aaa;
}
.btn {
    border: 3px solid #3f3d56;
    border-radius: 25px;
    color: #3f3d56;
    font-size: 15px;
    font-weight: bold;
    padding: 0.5rem;
    margin: 1rem;
}
.btn:hover {
        border: 3px solid #ff6363;
        color: #ff6363;
}
.fa-plus {
    padding: 0.5rem;
}
</style>