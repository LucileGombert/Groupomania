<template>  
    <div id="app">
        <div class="nav">
            <img class="nav__logo" alt="Logo Groupomania" src="../assets/iconLong450.png">
            <div class="nav__links">
                <router-link to="/post" class="nav__links__link">Accueil</router-link> 
                <router-link to="/profile" class="nav__links__link">Mon profil</router-link>
                <!-- <router-link to="/about" class="link"><i class="far fa-question-circle fa-2x"></i></router-link> -->
                <ModaleLogout v-bind:revele="revele" v-bind:toggleModale='toggleModale'></ModaleLogout>
                <i v-on:click="toggleModale" class="fas fa-sign-out-alt fa-2x nav__links__logoutLink"></i>

                <!-- <router-link to="/logout" class="link"><i class="fas fa-sign-out-alt fa-2x"></i></router-link> -->
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import ModaleLogout from '@/components/ModaleLogout.vue'

    export default {
        name: 'Navbar',
        data(){
            return {
            revele: false
            }
        },
        components: {
            ModaleLogout
        },
        methods: {
            toggleModale: function() {
            this.revele = !this.revele
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem;
        border-bottom: 3px dashed #3f3d56;
        a {
        font-weight: bold;
        color: #3f3d56;
            &.router-link-exact-active {
            color: #ff6363;
            }
        }
        &__logo {
            display: flex;
            justify-content: flex-start;
        }
        &__links {
            padding: 2rem;
            display: flex;
            align-items: center;
            &__link {
                padding-right: 4rem;
                text-decoration: none;
            }
            &__logoutLink {
                cursor: pointer;
                &:hover {
                    color: #ff6363;
                }
            }
        }
    }
</style>