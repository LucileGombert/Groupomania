<template>  
    <div id="post">
        <Navbar/>
    
        <div class="newPost">
            <div class="newPost__photo">
                <ProfileImage v-if="imageProfile == 'null'" :src="'user-circle-solid.svg'" class="newPost__photo"/>
                <ProfileImage v-else :src="imageProfile" class="newPost__photo"/>
            </div>
            <form @submit.prevent="createPost">
                <div class="newPost__content">
                    <textarea v-model="content" class="newPost__content__text" name="message" id="message" placeholder="Quoi de neuf ?"/>    
                    <div id="preview" style="display:block">
                        <img v-if="imagePreview" :src="imagePreview" id="preview" style="display:block" class="newPost__content__image"/>
                    </div>        
                    
                </div>

                <div class="newPost__option">
                    <div class="newPost__option__file">
                        <label for="file-input">
                            <!-- <button class="newPost__option__file__btn" aria-label="Ajouter une image"><i @click="uploadFile" class="far fa-images fa-2x newPost__option__file__button"></i></button> -->
                            <i @click="uploadFile" class="far fa-images fa-2x newPost__option__file__button"></i>
                        </label>
                        <input type="file" @change="onFileSelected" accept="image/*" id="file-input">
                    </div>
                    
                    <button class="newPost__option__button">Publier <i class="far fa-paper-plane"></i></button>
                </div>
            </form>
        </div>
        
        <div class="displayPost" v-for="post in posts" :key="post.postId">
            <div class="displayPost__item">
                <div class="displayPost__item__information">
                    <div class="displayPost__item__information__user">
                        <ProfileImage :src="post.User.imageProfile" class="displayPost__item__information__user__photo"/>
                        <!-- <i class="fas fa-user-circle fa-3x displayPost__item__information__user__photo"></i> -->
                        <h2 class="displayPost__item__information__user__name">{{ post.User.username }}</h2>
                    </div>
                    <div>
                        <span class="displayPost__item__information__date">Publié le {{ dateFormat(post.createdAt) }}</span>
                    </div>
                </div>

                <div class="displayPost__item__publication">
                    <p :contentPostId="post.id" style="display:block" class="displayPost__item__publication__text">{{ post.content }} postId: {{ post.id }}</p>

                    <div :inputId="post.id" style="display:none" v-bind:showInputModify="showInputModify" class="displayPost__item__publication__text__modifyText">
                        <textarea v-model="contentmodifyPost" :placeholder="post.content" class="displayPost__item__publication__text__modifyText__textarea"/>
                        <div class="newPost__option">
                            <div class="newPost__option__file">
                                <label for="file-input">
                                    <!-- <button class="newPost__option__file__btn" aria-label="Ajouter une image"><i @click="uploadFile" class="far fa-images fa-2x newPost__option__file__button"></i></button> -->
                                    <i @click="uploadFile" class="far fa-images fa-2x newPost__option__file__button"></i>
                                </label>
                                <input type="file" @change="onFileSelected" accept="image/*" id="file-input">
                            </div>
                            <button v-on:click="modifyPost(post.id)" class="displayPost__item__publication__text__modifyText__button"><i class="fas fa-check"></i></button>
                        </div>
                        <img v-if="imagePreview" :src="imagePreview" class="newPost__content__image"/>
                    </div>
                    <img v-if="post.imagePost" :imgPostId="post.id" style="display:block" :src="post.imagePost" class="displayPost__item__publication__image" alt=""/>
                </div>

                <div class="displayPost__item__option">
                    <div>
                        <!-- <i @click="likePost(post.id)" id="heart" :class="{'far fa-heart': !like, 'fas fa-heart': like}" class="displayPost__item__option__button"></i> -->
                        <i @click="likePost(post.id)" id="heart" class=" far fa-heart displayPost__item__option__button"></i>
                        <i @click="likePost(post.id)" style="display:none" id="heartplein" class=" fas fa-heart displayPost__item__option__button"></i>
                        <span v-if="post.likes > 0" class="displayPost__item__option__count">{{ post.likes }}</span>
                    </div>

                    <div>
                        <i @click="displayComment(post.id)" v-on:click="diplayCreateComment(post.id)" class="displayPost__item__option__button far fa-comment-dots" aria-label="Commenter le message"></i>
                        <span v-if="post.Comments.length > 0" class="displayPost__item__option__count">{{ post.Comments.length }}</span>
                    </div>

                    <i v-if="userId == post.UserId || isAdmin == 'true'" @click="displayModifyPost(post.id)" class="displayPost__item__option__button far fa-edit" aria-label="Modifier le message"></i>
                    <!-- <i v-if="userId == post.UserId || isAdmin == 'true'" @click="displayModale" class="displayPost__item__option__button far fa-edit" aria-label="Modifier le message"></i> -->
                    <i v-if="userId == post.UserId || isAdmin == 'true'" v-on:click="deletePost(post.id)" class="displayPost__item__option__button far fa-trash-alt" aria-label="Supprimer le message"></i>
                </div>
            </div>
            
            <div>
                <div class="displayComment" v-for="comment in comments" :key="comment.commentId">
                    <div v-bind:showComment="showComment" v-if="showComment && post.id == comment.postId" class="displayComment__item">
                        <div class="displayComment__item__information">
                            <div class="displayComment__item__information__user">
                                <!-- <i class="fas fa-user-circle fa-2x displayComment__item__information__user__photo"></i> -->
                                <ProfileImage :src="comment.User.imageProfile" class="displayPost__item__information__user__photo"/>
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
                            <i v-if="userId == comment.UserId || isAdmin == 'true'" @click="deleteComment(comment.id)" class="displayPost__item__option__button far fa-trash-alt"></i>
                        </div>
                    </div>
                </div>

                <div :formId="post.id" style="display:none" v-bind:showCreateComment="showCreateComment" class="displayComment__newComment">
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
import ProfileImage from '../components/ProfileImage'


export default {
    name: 'Post',
    components: {
        Navbar,
        ProfileImage,
    },
    data() {
        return {
            userId: localStorage.getItem('userId'),
            username: localStorage.getItem('username'),
            isAdmin: localStorage.getItem('isAdmin'),
            imageProfile: localStorage.getItem('imageProfile'),
            posts: [],
            post: '',
            imagePost: '',
            imagePreview: null,
            content: '',
            contentmodifyPost: '',
            comments: [],
            contentComment: '',
            like: false,
            likesPost: [],
            revele: false,
            showComment: false,
            showCreateComment: false,
            showInputModify: false
        }
    },
    created() {
        this.displayPost();
    },
    methods: {
        uploadFile () {
            this.$refs.fileUpload.click()
        },
        onFileSelected(event) {
            this.imagePost = event.target.files[0];
            this.imagePreview = URL.createObjectURL(this.imagePost);
        },      
        createPost() {
            var formData = new FormData();
            formData.append("content", this.content);
            formData.append("image", this.imagePost);

            console.log('image', this.imagePost);

            axios.post('http://localhost:3000/api/post', formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                alert('Votre message a bien été créé !');
                window.location.reload()
            })
            .catch(error => {
                const msgerror = error.response.data
                alert(msgerror.error)
            })
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
                console.log('post', response.data);
            })
            .catch(error => {
                const msgerror = error.response.data
                alert(msgerror.error)
            })
        },
        dateFormat(date){
            if (date) {
                return moment(String(date)).format('DD/MM/YYYY')
            }
        },
        displayModale() {
            this.revele = !this.revele
        },
        displayModifyPost(id) {
            const postId = id;

            this.showInputModify == false

            let input = document.querySelector('div[inputId="'+id+'"]')
            let inputId = input.getAttribute('inputId');

            let contentPost = document.querySelector('p[contentPostId="'+id+'"]')
            let contentPostId = contentPost.getAttribute('contentPostId');
            
            let imgPost = document.querySelector('img[imgPostId="'+id+'"]')
            let imgPostId = imgPost.getAttribute('imgPostId');

            let imgPreviewCreatePost = document.querySelector('#preview')

            console.log('postId', postId);
            console.log('inputId', inputId);
            console.log('contentPostId', contentPostId);
            console.log('imgPostId', imgPostId);
            console.log('preview', imgPreviewCreatePost);

            if(postId == inputId && postId == contentPostId && this.showInputModify == false) {
                input.style.display = "block";
                contentPost.style.display = "none";
                imgPreviewCreatePost.style.display = "none";
                this.showInputModify = !this.showInputModify
                if(postId == imgPostId) {
                    imgPost.style.display = "none";
                }
                
            } else if(postId == inputId && this.showInputModify == true) {
                input.style.display = "none";
                this.showInputModify = !this.showInputModify
            }
        },
        modifyPost(id) {
            var formData = new FormData();
            formData.append("content", this.contentmodifyPost);
            formData.append("image", this.imagePost);

            const postId = id;

            axios.put('http://localhost:3000/api/post/' + postId, formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                alert("Votre message a bien été modifié !");
                window.location.reload()
            })
            .catch(error => {
                const msgerror = error.response.data
                alert(msgerror.error)
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
                const msgerror = JSON.stringify(error.response.data)
                alert(msgerror.error)
            })
        },
        likePost(id) {
            const postId = id;
            const userId = localStorage.getItem('userId');
            axios.get('http://localhost:3000/api/post/' + postId + '/like', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.likesPost = response.data;
                    console.log('thislike', this.like)
                    console.log('likesPost', this.likesPost)
                    console.log('userId', userId);
                    console.log('tableau', this.likesPost.length);
                    if(this.likesPost.length == 0) {
                        this.like = false   
                        console.log('pas déjà liké', this.like);
                        axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                            like: this.like,
                        },{
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(() => {
                            console.log('thislike', this.like);
                            alert("Vous aimez ce message !");
                            const heart = document.querySelector('#heart');
                            heart.setAttribute('class', 'active');
                            console.log('coeur', heart);
                            heart.style.display = 'block';
                            window.location.reload()
                            
                        })
                        .catch(error => {
                            const msgerror = error.response.data
                            alert(msgerror.error)
                            alert(JSON.stringify(error.response.data))
                        })
                    } else {
                        for(let i=0; i < this.likesPost.length; i++) {
                            if(userId == this.likesPost[i].UserId) {
                                this.like = true   
                                console.log('déjà liké', this.like);
                                axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                                    like: this.like,
                                },{
                                    headers: {
                                        'Content-Type' : 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                                    }
                                })
                                .then(() => {
                                    console.log('thislike', this.like)
                                    alert("Vous n'aimez plus ce message");
                                    window.location.reload()
                                })
                                .catch(error => {
                                    const msgerror = error.response.data
                                    alert(msgerror.error)
                                    alert(JSON.stringify(error.response.data))
                                })
                            }
                        }
                    }
                })
                .catch(error => {
                    const msgerror = error.response.data
                    alert(msgerror.error)
                    alert(JSON.stringify(error.response.data))
                })
        },
        
        
        displayComment(id) {
            this.showComment = !this.showComment

            const postId = id;
            
            axios.get('http://localhost:3000/api/comment/' + postId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                this.comments = response.data;
                console.log('commentaire', response.data);
            })
            .catch(error => {
                const msgerror = error.response.data
                alert(msgerror.error)
            })
        },
        diplayCreateComment(id) {
            const postId = id;

            this.showCreateComment == false

            let form = document.querySelector('div[formId="'+id+'"]')
            console.log('form', form);
            console.log('postId :', id);

            let formId = form.getAttribute('formId');
            console.log('formId', formId);
            
            if(postId == formId && this.showCreateComment == false) {
                form.style.display = "block";
                this.showCreateComment = !this.showCreateComment
                console.log('?', this.showCreateComment);
            } else if(postId == formId && this.showCreateComment == true) {
                form.style.display = "none";
                this.showCreateComment = !this.showCreateComment
                console.log('?', this.showCreateComment);
            }
        },
        createComment(id) {
            const postId = id;
            axios.post('http://localhost:3000/api/comment/' + postId, {
                content: this.contentComment,
            },{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert("Votre commentaire a bien été créé !");
                window.location.reload()
            })
            .catch(error => {
                const msgerror = error.response.data
                alert(msgerror.error)
            })
        },
        deleteComment(id) {
            const commentId = id;
            console.log('commentId', commentId)

            axios.delete('http://localhost:3000/api/comment/' + commentId, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(() => {
                alert("Votre commentaire a bien été supprimé !");
                window.location.reload()
            })
            .catch(error => {
                const msgerror = error.response.data
                alert(msgerror.error)
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
    &__photo__image {
        width: 47px;
    }
    &__content__text {
        border-radius: 0 15px;
        border: none;
        margin: 1.5rem 0 0 0;
        max-width: 30rem;
        width: 90%;
        min-height: 5rem;
    }
    &__content__image {
        max-width: 30rem;
        width: 90%;
        height: 274px;
        margin: 1rem auto;
        object-fit: cover;
    }
    &__option {
        display: flex;
        justify-content: space-around;
        align-items: center;
        &__file>input {
            display: none; 
        }
        &__file {
            &__btn {
                border: none;
                background-color: #ffb1b1;
            }
            &__button {
                border: none;
                &:hover {
                    cursor: pointer;
                    color: white;
                }
            }
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
                margin: 0 15.25px;
                &__modifyText {
                    display: flex;
                    align-items: center;
                    padding: 2rem 0;
                    margin: 1rem 0;
                    border-radius: 15px;
                    box-shadow: 5px 5px 15px grey;                    
                    &__textarea {
                        border-radius: 5px;
                        width: 90%;
                    }
                    &__button {
                        border-radius: 5px;
                        margin-left: 1rem;
                        
                        &:hover {
                            color: #ff6363;
                            cursor: pointer;
                        }
                    }
                }
            }
            &__image {
                max-width: 1000px;
                width: 100%;
                height: 274px;
                margin: 1rem auto;
                object-fit: cover;
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
label i {
    color: #3f3d56;
}
</style>