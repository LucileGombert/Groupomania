<template>
  <div class="signup">
    <img alt="Logo Groupomania" src="../assets/iconLong450.png">
    <h1>Bienvenue sur Groupomania !</h1>
    <h2>Vous êtes nouveau par ici ? Alors créez vite votre compte !</h2>

    <div class="formContent">
      <form>
        <div class="inputGroup">
          <div class="input">
            <label for="lastName" class="inputLabel">Nom</label>
            <input type="text" id="lastName" name="lastName">
          </div>
          <div class="input">
              <label for="firstName" class="inputLabel">Prénom</label>
              <input type="text" id="firstName" name="firstName">
          </div>
        </div>
        
        <div class="input">
            <label for="service" class="inputLabel">Service</label>
            <input type="email" id="service" name="service">
        </div>
        <div class="input">
            <label for="mail" class="inputLabel">Adresse mail</label>
            <input type="email" id="mail" name="mail">
        </div>
        <div class="input">
            <label for="password" class="inputLabel">Mot de passe</label>
            <input type="password" id="password" name="password">
        </div>
        <button class="button" @click="$router.push('post')">M'inscrire</button>
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
.inputGroup {
    display: flex;
}
.input {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    margin-right: 1rem;
}
.inputLabel {
    text-align: start;
}
.button {
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