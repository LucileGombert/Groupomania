<template>  
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light nav">
            <img class="nav__logo" src="../assets/iconLong450.png" alt="Logo de Groupomania">

            <button class="navbar-toggler justify-content-center nav__menuButton" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>
            
            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav nav__links">
                    <li class="nav-item">
                        <router-link to="/post" class="nav__links__link">Accueil</router-link> 
                    </li>
                    <li class="nav-item">
                        <router-link to="/profile" class="nav__links__link">Mon profil</router-link>
                    </li>
                    <li class="nav-item">
                        <ModaleLogout v-bind:revele="revele" v-bind:displayModale='displayModale'></ModaleLogout>
                        <i @click="displayModale" class="fas fa-sign-out-alt nav__links__logoutLink"></i>
                    </li>
                </ul>
            </div>
        </nav>

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
            displayModale() {
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
        box-shadow: 0px 5px 15px #3f3d56;
        &__logo {
            display: flex;
            justify-content: flex-start;
            max-width: 450px;
            width: 52%;
        }
        &__menuButton:hover {
            color: #ff6363;
        }
        a {
        font-weight: bold;
        color: #3f3d56;
            &.router-link-exact-active {
            color: #ff6363;
            }
            &:hover {
                color: #ff6363;
            }
        }
        &__links {
            padding: 2rem;
            align-items: flex-end;
            @media (max-width: 766px) {
                padding: 0;
            }
            &__link {
                padding-right: 4rem;
                text-decoration: none;
                align-items: flex-end;
                @media (max-width: 766px) {
                    padding: 0;
                }
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