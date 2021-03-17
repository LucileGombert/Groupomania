<template> 
    <div class="modaleBloc" v-if="revele">
        <div class="modaleBloc__overlay" v-on:click="displayModale"></div>
        
        <div class="modaleBloc__card">
            <div class="modaleBloc__card__title">
                <h2>Vous souhaitez modifier vos informations ?</h2>
                <i class="fas fa-user-circle fa-4x"></i>
                <div>user.username</div>
                <div class="modaleBloc__card__title__close">
                    <i class="far fa-times-circle fa-2x modaleBloc__card__title__close" v-on:click="displayModale"></i>
                </div>
            </div>
            <button class="modaleBloc__card__button" @click="updateAccount">Enregistrer les modifications</button>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'UpdateProfile',
        props: ['revele', 'displayModale'],
        methods: {
            updateAccount(){
                const userId = localStorage.getItem('userId');
                axios.put('http://localhost:3000/api/user/' + userId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    console.log("Profil mis à jour");
                    localStorage.clear();
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(JSON.stringify(error.response.data))
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
            background: rgba(0,0,0,0.5);
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
            &__button {
                border: 3px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.9rem;
                margin: 1rem 0 2rem 0;
                outline-style: none;
                &:hover {
                    border: 3px solid #ff6363;
                    color: #ff6363;
                }
            }
        }       
    }
</style>