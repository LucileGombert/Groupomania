<template>
    <div class="like">
        <i :id="post.id" @click="likePost()" class="fas fa-heart like__button" aria-label="Aimer le message"></i>
        <span v-if="post.likes > 0" class="like__count">{{ post.likes }}</span>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'Likes',
        props:['post'],
        data(){
            return {
                userId: localStorage.getItem('userId'),
            }
        },
        mounted() {
            this.displayHeartColor();  
        },
        methods:{
            // Permet d'aimer un message
            likePost() {
                const postId = this.post.id;
                const userId = this.userId;

                axios.get('http://localhost:3000/api/post/' + postId + '/like', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.postLikes = response.data;
                    
                    if(this.postLikes.length == 0) {
                        this.like = false  

                        axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                            like: this.like,
                        },{
                            headers: {
                                'Content-Type' : 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                        .then(() => {
                            alert("Vous aimez ce message !");
                            window.location.reload()
                            
                        })
                        .catch(error => {
                            const msgerror = error.response.data
                            alert(msgerror.error)
                        })
                    } else {                     
                        if(this.postLikes.find(x => x.userId == userId)) {
                            this.like = true   
                            
                            axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                                like: this.like,
                            },{
                                headers: {
                                    'Content-Type' : 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            })
                            .then(() => {
                                alert("Vous n'aimez plus ce message");
                                window.location.reload()
                            })
                            .catch(error => {
                                const msgerror = error.response.data
                                alert(msgerror.error)
                                alert(JSON.stringify(error.response.data))
                            })
                        } else {
                            this.like = false   
                        
                            axios.post('http://localhost:3000/api/post/' + postId + '/like', {
                                like: this.like,
                            },{
                                headers: {
                                    'Content-Type' : 'application/json',
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            })
                            .then(() => {
                                alert("Vous aimez ce message !");
                                window.location.reload()
                            })
                            .catch(error => {
                                const msgerror = error.response.data
                                alert(msgerror.error)
                            })
                        }
                    }
                })
                .catch(error => {
                    const msgerror = error.response.data
                    alert(msgerror.error)
                    alert(JSON.stringify(error.response.data))
                })
            },

            // Permet d'afficher un coeur vide ou plein en couleur en fonction de si l'utilisateur aime le message ou non
            displayHeartColor(){
                const postId = this.post.id;
                const userId = localStorage.getItem('userId');

                axios.get('http://localhost:3000/api/post/' + postId + '/like', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.postLikes = response.data;
                                
                    if(this.postLikes.find(x => x.userId == userId)) {
                        document.getElementById(this.post.id).classList = "fas fa-heart like__button postLiked"; 
                    
                    } else {  
                        document.getElementById(this.post.id).classList = "far fa-heart like__button"; 
                    }
                })
                .catch(error => {
                    const msgerror = error.response.data
                    alert(msgerror.error)
                })
            }
        }
    }
</script>


<style lang="scss">
    .like {
        &__button:hover {
            color: #ff6363;
            cursor: pointer;
        }
        &__count {
            padding-left: 0.5rem;
        }
    }
    .postLiked {
        color:#ff6363;
    }
</style>