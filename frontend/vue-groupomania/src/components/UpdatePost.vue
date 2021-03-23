<template>
    <div v-if="revele" class="modaleBloc">
        <div class="modaleBloc__overlay" v-on:click="displayModale"></div>

        <div class="modaleBloc__card">
            <div class="modaleBloc__card__title">
                <h2>Modifier ma publication</h2>
        
                <div class="modaleBloc__card__title__close">
                    <i class="far fa-times-circle fa-2x modaleBloc__card__title__close" v-on:click="displayModale"></i>
                </div>
            </div>

            <div class="modaleBloc__card__content">
                <i class="fas fa-user-circle fa-3x modaleBloc__card__content__photo"></i>
                <textarea v-model="contentmodifyPost" class="modaleBloc__card__content__textarea"/>
                <!-- <img v-if="post.imagePost" src="../../public/icon.png" class="displayPost__item__publication__image" alt=""/> -->
            </div>

            <button @click="updatePost" class="modaleBloc__card__button">Enregister les modifications</button>
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'UpdatePost',
        props: ['revele', 'displayModale'],
        methods: {
            modifyPost(id) {
                console.log('id:', id)
                const postId = id;
                axios.put('http://localhost:3000/api/post/' + postId, {
                    content: this.contentmodifyPost,
                    // content: this.content,
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
                    const msgerror = error.response.data
                    alert(msgerror.error)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .modaleBloc {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &__overlay {
            background: rgba(0,0,0,0.3);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        &__card {
            z-index: 2;
            position: fixed;
            background: #f1f1f1;
            color: #3f3d56;
            &__title {
                display: flex;
                flex-direction: column;
                text-align: center;
                padding: 3rem 6rem 1.5rem 6rem;
                & h2 {
                    margin-top: 0px;
                    
                }
                &__close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    color: #3f3d56;
                    &:hover {
                        color: #ff6363;
                    }
                }
            }
            &__content {
                display: flex;
                justify-content: center;
                margin: 2rem 0;
                &__textarea {
                    width: 70%;
                    margin-left: 1rem;
                }
            }
            &__button {
                border: 3px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.5rem;
                margin: 2rem 0 2rem 0;
                outline-style: none;
                &:hover {
                    border: 3px solid #ff6363;
                    color: #ff6363;
                }
            }
        }       
    }
</style>