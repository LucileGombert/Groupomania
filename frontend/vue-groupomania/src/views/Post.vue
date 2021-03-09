<template>  
    <div id="post">
        <Navbar/>
    
        <div class="newPost">
            <div class="newPost__photo">
                <img class="newPost__photo__img" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
            </div>
            <!-- <form @submit.prevent="handleSubmit"> -->
            <form @submit.prevent="createPost">
                <div class="newPost__content">
                    <textarea v-model="content" class="newPost__content__text" name="message" id="message" placeholder="Quoi de neuf ?"/>            
                </div>
                <div class="newPost__option">
                    <div class="newPost__option__file">
                        <label for="file-input">
                            <i class="far fa-images fa-2x newPost__option__file__button"></i>
                        </label>
                        <input type="file" @change="onFileSelected" accept="image/*" id="file-input">
                    </div>
                    <button class="newPost__option__button">Publier</button>
                </div>
            </form>
        </div>
        
        <div class="displayPost" v-for="post in posts" :key="post.postId">
            <div class="displayPost__item">
                <div class="displayPost__item__information">
                    <div class="displayPost__item__information__user">
                        <img class="displayPost__item__information__user__photo" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
                        <h2 class="displayPost__item__information__user__name"> {{ post.User.username }}</h2>
                    </div>
                    <div>
                        <span class="displayPost__item__information__date">Publié le {{ dateFormat(post.createdAt) }}</span>
                    </div>
                </div>
                <div class="displayPost__item__publication">
                    <p class="displayPost__item__publication__text">{{ post.content }}{{ post.id }}</p>
                </div>
                <div class="displayPost__item__option">
                    <i class="displayPost__item__option__button far fa-heart"></i>
                    <i v-on:click="displayComment(post.id)" class="displayPost__item__option__button far fa-comment-dots"><displayComment/></i>
                    <!-- <i v-on:click="createComment(post.id)" class="displayPost__item__option__button far fa-comment-dots"></i> -->
                    <i v-if="userId == post.UserId" v-on:click="modifyPost(post.id)" class="displayPost__item__option__button far fa-edit"></i>
                    <i v-if="userId == post.UserId" v-on:click="deletePost(post.id)" class="displayPost__item__option__button far fa-trash-alt"></i>
                </div>
            </div>

            <div class="displayComment" v-for="comment in comments" :key="comment.commentId">
                    <div class="displayComment__item">
                        <div class="displayComment__item__information">
                            <div class="displayComment__item__information__user">
                                <img class="displayComment__item__information__user__photo" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt="">
                                <h2 class="displayComment__item__information__user__name"> {{ comment.User.username }}</h2>
                            </div>
                            <div>
                                <span class="displayPost__item__information__date">Publié le {{ dateFormat(comment.createdAt) }}</span>
                            </div>
                        </div>
                        <div class="displayPost__item__publication">
                            <p class="displayPost__item__publication__text">{{ comment.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        

        
        
        <router-view/>
    </div>
</template>



<script>
import axios from 'axios'
import moment from "moment";
import Navbar from '@/components/Navbar.vue'
// import displayComment from '@/components/displayComment.vue'


export default {
    name: 'Post',
    components: {
        Navbar,
        // displayComment
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            posts: [],
            selectedFile: null,
            content:'',
            comments: []
        }
    },
    created() {
        this.displayPost();
        this.displayComment();
    },
    methods: {
        createPost() {
            axios.post('http://localhost:3000/api/post', {
                content: this.content,
                link: this.selectedFile
            },{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert('Votre message a bien été créé !');
            })
            .catch(error => console.log(error));
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },
        displayPost() {
            axios.get('http://localhost:3000/api/post')
            .then(reponse => {
                this.posts = reponse.data;
                console.log(this.posts);
            });
        },
        dateFormat(date){
            if (date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        modifyPost(id) {
            console.log('id:', id)
            const postId = id;
            axios.put('http://localhost:3000/api/post/' + postId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert("Votre message a bien été modifié !");
            })
            .catch(error => console.log(error));
        },
        deletePost(id) {
            const postId = id;
            console.log('postIdDelete', postId)
            axios.delete('http://localhost:3000/api/post/' + postId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert("Votre message a bien été supprimé !");
            })
            .catch(error => console.log(error));
        },
        // createComment(id) {
        //     const postId = id;
        //     console.log('postIdComment', postId)
        //     axios.post('http://localhost:3000/api/post/' + postId + '/comment', {
        //         headers: {
        //             'Content-Type' : 'application/json',
        //             'Authorization': 'Bearer ' + localStorage.getItem('token')
        //         }
        //     })
        //     .then(() => {
        //         alert("Votre commentaire a bien été créé !");
        //     })
        //     .catch(error => console.log(error));
        // },
        displayComment(id) {
            const postId = id;
            
            axios.get('http://localhost:3000/api/post/' + postId + '/comment', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(reponse => {
                this.comments = reponse.data;
                console.log('commentaires', this.comments);
            });
        }
        
        
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
        &__file>input {
            display: none; 
        }
        &__file__button:hover {
            cursor: pointer;
            color: #ff6363;
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
                cursor: pointer;
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
                align-items: center;
                &__photo {
                width: 3rem;
                margin: 1.5rem 0.5rem 0 0;
                }
                &__name {
                    margin-bottom: 0;
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
            margin: 0.5rem 2rem;
            &__text {
                text-align: left;
            }
        }
        &__option {
            display: flex;
            justify-content: space-around;
            &__button:hover {
                color: #ff6363;
                cursor: pointer;
            }
        }
    }
}

.displayComment {
    display: flex;
    flex-direction: column;
    &__item {
        display: flex;
        flex-direction: column;
        border: 2px solid #ff6363;
        border-radius: 25px;
        margin: auto;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 40%;
        &__information {
            display: flex;
            justify-content: space-between;
            &__user {
                display: flex;
                align-items: center;
                &__photo {
                width: 2rem;
                margin: 0.5rem 0.5rem 0 0;
                }
                &__name {
                    margin-top: 0.5rem;
                    margin-bottom: 0;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>