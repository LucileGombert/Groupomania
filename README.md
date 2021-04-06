Groupomania
====================================================

⇢ Présentation :
<br>Créer un réseau social d'entreprise.

⇢ Technologies utilisées :
<br>▹ HTML
<br>▹ CSS
<br>▹ JavaScript
<br>▹ Vue.js
<br>▹ Node.js
<br>▹ Express.js
<br>▹ MySQL
<br>▹ SQL

⇢ Prérequis :
<br>Vous devrez avoir Vue CLI, Node et MySQL installés localement sur votre machine.

⇢ Installation :
<br>Backend :
-------------
<br>▹ Clonez ce repository ;
<br>▹ Copiez le fichier .env.example en remplaçant les valeurs par défaut pour accéder à la base de données ;
<br>▹ A partir du dossier backend, exécutez `npm install` puis `nodemon server` ;
<br>▹ Le serveur doit fonctionner sur `localhost` avec le port par défaut `3000` ;
<br>
<br>▹ Base de données :
    -------------------
<br>▹ Vérifier que les informations contenues dans le fichier config.json sont correctes et correspondent à votre base de données
<br>▹ Exécutez `sequelize model:create --attributes "username:string email:string password:string" --name User` pour créer la table des utilisateurs et reproduire la même procédure pour chaque table;
<br>▹ Exécutez `sequelize db:migrate` pour intégrer les modèles créés dans la base de données ;
<br>
<br>Frontend :
--------------
<br>▹ A partir du dossier frontend et du sous-dossier vue-groupomania, exécutez `npm install` puis `npm run serve` ;
<br>▹ Le frontend de l'application doit fonctionner sur `localhost` avec le port par défaut `8080`.
