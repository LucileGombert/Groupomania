<template>
    <div class="login">
    <img alt="Logo Groupomania" src="../assets/iconLong450.png">
    <h1>Bienvenue sur Groupomania !</h1>
    <h2>Vous avez déjà un compte ? Alors connectez-vous vite !</h2>
    
    <div class="formContent">
        <form>
        <div class="input">
            <label for="mail" class="inputLabel">Adresse mail</label>
            <input type="email" id="mail" name="mail">
        </div>
        <div class="input">
            <label for="password" class="inputLabel">Mot de passe</label>
            <input type="password" id="password" name="password">
        </div>
        <button class="btn" @click="$router.push('globalhome')">Me connecter</button>
    </form>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.formContent {
    display: flex;
    justify-content: center;
    
}
form {
    margin-top: 3rem;
    padding: 3rem;
    border: 3px solid #3f3d56;
    border-radius: 25px;
}
.input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}
.inputLabel {
    text-align: start;
}
.btn {
    border: 3px solid #3f3d56;
    border-radius: 25px;
    color: #3f3d56;
    font-size: 15px;
    font-weight: bold;
    padding: 0.9rem;
    margin: 1rem;
}
.btn:hover {
    border: 3px solid #ff6363;
    color: #ff6363;
}
</style>