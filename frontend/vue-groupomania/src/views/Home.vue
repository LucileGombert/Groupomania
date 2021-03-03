<template>
    <div class="home">
        <img alt="Logo Groupomania" src="../assets/iconLong450.png">

        <div class="display">
            <img alt="Vue logo" src="../assets/bottomImage450.png" class="display__picture">
            <div class="login">
                <form @submit.prevent="handleSubmit" class="login__form">
                    <h1 class="login__form__title">Se connecter</h1>
                    <div class="login__form__input">
                        <label for="mail" class="login__form__input__label">Email</label>
                        <input type="email" v-model="email" id="mail" name="mail">
                    </div>
                    <div class="login__form__input">
                        <label for="password" class="login__form__input__label">Mot de passe</label>
                        <input type="password" v-model="password" id="password" name="password">
                    </div>
                    <button class="login__form__button">Connexion</button>

                    <p>Vous n'avez pas encore de compte ? <router-link to="/signup" class="login__form__signup">S'inscrire</router-link></p>
                </form>
            </div>
        </div> 
    </div>
</template>


<script>
    import axios from 'axios'

    export default {
        name: 'Home',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async handleSubmit() {
                const response = await axios.post('http://localhost:3000/api/user/login', {
                    email: this.email,
                    password: this.password,
                });
                
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', parseInt(response.data.id));
                localStorage.setItem('username', response.data.username);

                this.$router.push('post');
            }
        }
    }
</script>


<style scoped lang="scss">
    .display {
        margin-top: 2rem;
        &__picture {
            float: left;
            padding-top: 5rem;
            margin-left: 3rem;
        }
    }

    .login {
        display: flex;
        justify-content: center;
        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 30%;
            border: 3px solid #3f3d56;
            border-radius: 25px;
            margin-top: 2rem;
            margin-left: -2rem;
            padding: 1rem;
            &__title {
                margin-bottom: 3rem;
                font-size: 27px;
            }
            &__input {
                display: flex;
                flex-direction: column;
                margin-bottom: 2rem;
                width: 70%;
                &__label {
                    text-align: start;
                    font-weight: bolder;
                }
            }
            &__button {
                border: 3px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.9rem;
                margin: 1rem;
                outline-style: none;
                &:hover {
                    border: 3px solid #ff6363;
                    color: #ff6363;
                }
            }
            &__signup {
                font-weight: bold;
                text-decoration: none;
                color: #ff6363;
            }
        }
    }
</style>