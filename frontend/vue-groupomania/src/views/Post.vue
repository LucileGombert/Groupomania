<template>  
    <div id="post">
        <Navbar/>
    
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

        <div class="displayPost" v-for="post in posts" :key="post.postId">
            <div class="displayPost__item">
                <div class="displayPost__item__information">
                    <div class="displayPost__item__information__user">
                        <img class="displayPost__item__information__user__photo" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
                        <h2> {{ post.User }}</h2>
                    </div>
                    <div>
                        <span class="displayPost__item__information__date">{{ post.createdAt }}</span>
                    </div>
                </div>
                <div class="displayPost__item__publication">
                    <p class="displayPost__item__publication__text"> {{ post.content }}</p>
                </div>
                <div class="displayPost__item__option">
                    <i class="far fa-heart"></i>
                    <i class="far fa-comment-dots"></i>
                </div>
            </div>
            
        </div>
        <router-view/>
    </div>
</template>



<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'

export default {
    name: 'Post',
    components: {
        Navbar
    },
    data() {
        return {
            posts: [],
        }
        
    },
    created() {
        this.displayPost();
    },
    methods: {
        displayPost() {
            axios.get('http://localhost:3000/api/post')
            .then(reponse => {
                this.posts.push(reponse.data);
                console.log(this.posts);
            });
        },
        
    }
   
}
</script>


<style scoped lang="scss">
.newPost {
    background: #ffb1b1;
    border-radius: 25px;
    margin: auto;
    margin-top: 2rem;
    padding: 1rem;
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
            outline-style: none;
            &:hover {
                border: 2px solid #ff6363;
                color: #ff6363;
            }
        }
        
    }
}
.displayPost {
    display: flex;
    flex-direction: column;
    &__item {
        display: flex;
        flex-direction: column;
        border: 2px solid #ff6363;
        border-radius: 25px;
        margin: auto;
        margin-top: 2rem;
        padding: 1rem;
        width: 50%;
        &__information {
            display: flex;
            justify-content: space-between;
            &__user {
                display: flex;
                &__photo {
                width: 3rem;
                margin: 1.5rem 0.5rem 0 0;
                }
            }
            &__date {
                display: flex;
                justify-content: flex-end;
            }
        }
        &__publication {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &__option {
            display: flex;
            justify-content: space-around;
        }
    }
}
</style>