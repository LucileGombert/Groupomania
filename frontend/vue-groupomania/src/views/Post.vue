<template>  
    <div id="app">
        <Navbar msg="Bienvenue sur Groupomania, votre nouveau réseau social d'entreprise !"/>
    
        <div class="newPost">
            <div class="newPost__photo">
                <img class="newPost__photo__img" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
            </div>
             <div class="newPost__content">
                 <textarea class="newPost__content__text" name="message" id="message" placeholder="Quoi de neuf ?"/>                
            </div>
             <div class="newPost__option">
                 <div>
                     <i class="far fa-images fa-2x newPost__option__file"></i>
                     <i class="fas fa-film fa-2x"></i>
                 </div>
                 <button class="newPost__option__button">Publier</button>
            </div>

        </div>
        <router-view/>
    </div>
</template>



<script>
import Navbar from '@/components/Navbar.vue'


export default {
    name: 'Post',
    components: {
        Navbar
    }
}
</script>


<style scoped lang="scss">
.newPost {
    background: #ffb1b1;
    border-radius: 25px;
    margin: auto;
    margin-top: 2rem;
    
    width: 50%;
    &__photo {
        display: flex;
        justify-content: center;
        align-items: center;
        &__img {
            width: 4rem;
            margin: 1.5rem 0 0 0;
        }
    }
    &__content__text {
        border-radius: 0 15px;
        border: none;
        margin: 1.5rem 0 0 0;
        width: 30rem;
        min-height: 5rem;
    }
    &__option {
        display: flex;
        justify-content: space-around;
        align-items: center;
        &__file {
            padding-right: 1rem;
        }
        &__button {
            border: 2px solid #3f3d56;
            border-radius: 25px;
            color: #3f3d56;
            font-size: 15px;
            font-weight: bold;
            padding: 0.4rem;
            margin: 1rem;
            &:hover {
                border: 2px solid #ff6363;
                color: #ff6363;
            }
        }
        
    }
}
</style>