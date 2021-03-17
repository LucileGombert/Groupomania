<template>  
    <div id="post">
        <Navbar/>
    
        <div class="newPost">
            <div class="newPost__photo">
                <i class="fas fa-user-circle fa-3x"></i>
                
                <!-- <img class="newPost__photo__img" src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png" alt=""> -->
            </div>
            <form @submit.prevent="createPost">
                <div class="newPost__content">
                    <textarea v-model="content" class="newPost__content__text" name="message" id="message" placeholder="Quoi de neuf ?"/>            
                </div>
                <div class="newPost__option">
                    <div class="newPost__option__file">
                        <label for="file-input">
                            <i @click="uploadFile" class="far fa-images fa-2x newPost__option__file__button"></i>
                        </label>
                        <input type="file" @change="onFileSelected" ref="selectedFile" accept="image/*" id="file-input">
                    </div>
                    <button class="newPost__option__button">Publier</button>
                </div>
            </form>
        </div>
        
        <div class="displayPost" v-for="post in posts" :key="post.postId">
            <div class="displayPost__item">
                <div class="displayPost__item__information">
                    <div class="displayPost__item__information__user">
                        <i class="fas fa-user-circle fa-3x displayPost__item__information__user__photo"></i>
                        <h2 class="displayPost__item__information__user__name">{{ post.User.username }}</h2>
                    </div>
                    <div>
                        <span class="displayPost__item__information__date">Publié le {{ dateFormat(post.createdAt) }}</span>
                    </div>
                </div>
                <div class="displayPost__item__publication">
                    <p v-if="!reveleModifyPost" class="displayPost__item__publication__text">{{ post.content }} postId: {{ post.id }}</p>
                    <div v-bind:displayModifyPost='displayModifyPost' v-bind:reveleModifyPost="reveleModifyPost" v-if="reveleModifyPost">
                        <input v-model="content" class="displayPost__item__publication__text"/>
                        <button v-on:click="modifyPost(post.id)">Enregistrer</button>
                    </div>
                    <img v-if="post.imagePost" :src="url || post.imagePost" class="displayPost__item__publication__image" alt=""/>
                </div>
                <div class="displayPost__item__option">
                    <i @click="likePost(post.id)" class="displayPost__item__option__button far fa-heart"></i>
                    <i v-if="like == true" class="fas fa-heart"></i>
                    <!-- <span v-if="likes.length > 0" class="displayPost__item__option__count">{{ likes.length }}</span> -->
                    
                    <!-- <div class="like-container">
                        <input type="checkbox" :value=post.id name="checkbox" v-bind:id="post.id" v-model="liked" @click="likePost(post.id)" class="heartInput"/>
                        <label v-bind:for="post.id">
                            <i class="fas fa-heart"></i>
                        </label>
                    </div> -->

                    <div>
                        <!-- <input type="checkbox" :value=post.id name="checkbox" v-bind:id="post.id"  @click="displayComment(post.id)" v-on:click="displayCommentPost" class="commentInput"/>
                        <label v-bind:for="post.id">
                            <i class="far fa-comment-dots"></i>
                        </label> -->

                        <i v-bind:buttonId="post.id" @click="displayComment(post.id)" v-on:click="displayCommentPost" class="displayPost__item__option__button far fa-comment-dots"></i>
                        <span v-if="comments.length > 0" class="displayPost__item__option__count">{{ comments.length }}</span>
                        <!-- <div v-if="comments.length > 0" style="display:none" :data-form="post.id" class="displayPost__item__option__count">{{ comments.length }}</div> -->
                    </div>
                    <i v-if="userId == post.UserId || isAdmin == 'true'" v-on:click="displayModifyPost" class="displayPost__item__option__button far fa-edit"></i>
                    <i v-if="userId == post.UserId || isAdmin == 'true'" v-on:click="deletePost(post.id)" class="displayPost__item__option__button far fa-trash-alt"></i>
                </div>
            </div>

            <div>
                <div class="displayComment" v-for="comment in comments" :key="comment.commentId">
                    <div v-bind:revele="revele" v-if="revele && post.id == comment.postId" class="displayComment__item">
                        <div class="displayComment__item__information">
                            <div class="displayComment__item__information__user">
                                <i class="fas fa-user-circle fa-2x displayComment__item__information__user__photo"></i>
                                <h2 class="displayComment__item__information__user__name"> {{ comment.User.username }}</h2>
                            </div>
                            <div>
                                <span class="displayPost__item__information__date">Publié le {{ dateFormat(comment.createdAt) }}</span>
                            </div>
                        </div>
                        <div class="displayPost__item__publication">
                            <p class="displayPost__item__publication__text">{{ comment.content }} post:{{ comment.postId }} comment:{{ comment.id }}</p>
                        </div>
                        <div class="displayPost__item__option">
                            <i v-if="userId == comment.UserId || isAdmin == 'true'" @click="modifyComment(comment.id)" class="displayPost__item__option__button far fa-edit"></i>
                            <i v-if="userId == comment.UserId || isAdmin == 'true'" @click="deleteComment(comment.id)" class="displayPost__item__option__button far fa-trash-alt"></i>
                        </div>
                    </div>
                </div>

                <div style="display:none" :data-form="post.id" class="displayComment__newComment">
                    <form @submit.prevent="createComment(post.id)" class="displayComment__newComment__form">
                        <textarea v-model="contentComment" class="displayComment__newComment__form__text" name="comment" id="comment" placeholder="Ecrivez votre commentaire ..."/>              
                        <div>
                            <button class="displayComment__newComment__form__button"><i class="far fa-paper-plane"></i></button>
                        </div>
                    </form>
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



export default {
    name: 'Post',
    components: {
        Navbar,
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            isAdmin: localStorage.getItem('isAdmin'),
            posts: [],
            imagePost: '',
            content: '',
            comments: [],
            contentComment: '',
            like: false,
            revele: false,
            reveleModifyPost: false,
        }
    },
    created() {
        this.displayPost();
    },
    methods: {
        createPost() {
            console.log(this.imagePost);
            axios.post('http://localhost:3000/api/post', {
                content: this.content,
            
                imagePost: this.imagePost
            },{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert('Votre message a bien été créé !');
                window.location.reload()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
        },
        uploadFile () {
            this.$refs.fileUpload.click()
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },
        displayPost() {
            axios.get('http://localhost:3000/api/post', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                this.posts = response.data;
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
        },
        dateFormat(date){
            if (date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        displayModifyPost() {
            this.reveleModifyPost = !this.reveleModifyPost
        },
        modifyPost(id) {
            console.log('id:', id)
            const postId = id;
            axios.put('http://localhost:3000/api/post/' + postId, {
                content: this.content,
            },{
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert("Votre message a bien été modifié !");
                window.location.reload()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
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
                window.location.reload()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
        },
        likePost(id) {
            if(this.like == false) {
                const postId = id;
                axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                    like: this.like,
                },{
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(like => {
                    alert("Vous aimez ce message !");
                    console.log('like', like);
                    this.like == true
                    console.log('thislike', this.like)
                    window.location.reload()
                    
                })
                .catch(error => {
                    alert(JSON.stringify(error.response.data))
                })
            } 
        },


        
        createComment(id) {
            const postId = id;
            axios.post('http://localhost:3000/api/post/' + postId + '/comment', {
                content: this.contentComment,
            },{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            // .then(() => {
            //     alert("Votre commentaire a bien été créé !");
            // })
            .then(response => {
                console.log(response);
                alert("Votre commentaire a bien été créé !");
                window.location.reload()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
        },
        displayComment(id) {
            const postId = id;
            console.log('postId :', id);
            let form = document.querySelector('div[data-form="'+id+'"]')
            console.log('form', form);
            form.style.display = "block";
            
    
            // let input = document.querySelector('.commentInput')
            // if(input.checked) {
            //     form.style.display = "block";
            // } else if(!input.checked) {
            //     form.style.display = "none";
            // }

            // let formId = form.getAttribute('data-form');
            // console.log('formId', formId);

            axios.get('http://localhost:3000/api/post/' + postId + '/comment', {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(reponse => {
                this.comments = reponse.data;
                console.log('commentaires', this.comments);
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
        },
        displayCommentPost() {
            this.revele = !this.revele
        },
        modifyComment(id) {
            console.log('id:', id)
            const postId = id;
            axios.put('http://localhost:3000/api/post/' + postId + '/comment' , {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert("Votre commentaire a bien été modifié !");
                window.location.reload()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
        },
        deleteComment(id) {
            const postId = id;
            const commentId = id;
            console.log('postId', postId)
            console.log('commentId', commentId)

            axios.delete('http://localhost:3000/api/post/' + postId + '/comment' + commentId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log('erreur du back :', response);
                alert("Votre commentaire a bien été supprimé !");
                window.location.reload()
            })
            .catch(error => {
                alert(JSON.stringify(error.response.data))
            })
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
    @media (max-width: 950px) {
        width: 60%;
    }
    @media (max-width: 768px) {
        width: 70%;
    }
    @media (max-width: 550px) {
        width: 80%;
    }
    @media (max-width: 450px) {
        width: 90%;
    }
    &__content__text {
        border-radius: 0 15px;
        border: none;
        margin: 1.5rem 0 0 0;
        max-width: 30rem;
        width: 90%;
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
            color: white;
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
        @media (max-width: 950px) {
            width: 60%;
        }
        @media (max-width: 768px) {
            width: 70%;
        }
        @media (max-width: 550px) {
            width: 80%;
        }
        @media (max-width: 450px) {
            width: 90%;
        }
        &__information {
            display: flex;
            justify-content: space-between;
            align-items: center;
            @media (max-width: 380px) {
                display: flex;
                flex-wrap: wrap;
            }
            &__user {
                display: flex;
                align-items: center;
                &__photo {
                margin: 0.5rem 0.5rem 0 0;
                }
                &__name {
                    margin-bottom: 0.2rem;
                    font-size: 22px;
                    @media (max-width: 767px) {
                        font-size: 18px;
                    }
                }
            }
            &__date {
                display: flex;
                justify-content: flex-end;
                @media (max-width: 767px) {
                    font-size: 14px;
                }
                @media (max-width: 380px) {
                    font-size: 10px;
                }
            }
        }
        &__publication {
            display: flex;
            flex-direction: column;
            // align-items: center;
            // margin: auto;
            // margin-bottom: 1rem;
            margin: 0.5rem 2rem;
            &__text {
                text-align: left;
            }
            &__image {
                width: 500px;
            }
        }
        &__option {
            display: flex;
            justify-content: space-around;
            &__button:hover {
                color: #ff6363;
                cursor: pointer;
            }
            &__count {
                padding-left: 0.5rem;
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
            align-items: center;
            &__user {
                display: flex;
                &__photo {
                margin: 0 0.5rem 0 0;
                }
                &__name {
                    margin-top: 0.5rem;
                    margin-bottom: 0;
                    font-size: 18px;
                }
            }
        }
    }
    &__newComment {
        background: #ffb1b1;
        border-radius: 25px;
        margin: auto;
        margin-top: 0.5rem;
        padding: 0.5rem;
        width: 40%;
        @media (max-width: 950px) {
            width: 50%;
        }
        @media (max-width: 768px) {
            width: 60%;
        }
        @media (max-width: 550px) {
            width: 70%;
        }
        @media (max-width: 450px) {
            width: 80%;
        }
        &__form {
            display: flex;
            align-items: center;
            &__text {
                border-radius: 15px;
                border: none;
                margin: 0.5rem ;
                padding: 0.5rem;
                width: 27rem;
                min-height: 3rem;
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
                    color: #ff6363;
                    cursor: pointer;
                }
                @media (max-width: 450px) {
                    margin: 0.5rem;
                }
                
            }
        }
    }
}
@media (max-width: 767px) {
    textarea {
        font-size: 14px;
    }
}
.heartInput {
    display: none;
}
label i {
    color: #3f3d56;
}
.heartInput:checked + label i {
    color: #ff6363;
}
</style>