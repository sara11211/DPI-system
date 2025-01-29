# Application Web de Gestion du Dossier Patient Informatisé
Cette application web est conçue pour gérer les dossiers médicaux informatisés des patients. Elle est utilisée par des professionnels de santé tels que des médecins, pharmaciens, infirmiers, radiologues et techniciens et un corps d'administration pour suivre les antécédents médicaux, les traitements et autres informations pertinentes de leurs patients.

# Structure du Projet
Le projet est organisé en trois dossiers principaux :

--> frontend : Contient l'application Angular pour l'interface utilisateur.

--> backend : Contient l'application Django pour le backend.

--> tests : Contient tous les tests pour le frontend et le backend.

# Technologies Utilisées
--> Frontend : Angular

--> Backend : Django

--> Tests : Postman, Selenium

# Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

--> Node.js et npm pour le frontend Angular.

--> Python et pip pour le backend Django.

--> Angular CLI installé globalement (npm install -g @angular/cli).

--> Django installé globalement (pip install django).

# Installation
--> Cloner le dépôt :
git clone https://github.com/sara11211/DPI-system.git

--> Lancer l'application :

==> Exécutez le script start_app.bat situé dans le dossier principal. 
    (Lancez la commande ".\start_app.bat)

==> Ouvrez votre navigateur et accédez à http://localhost:4200 pour utiliser l'application.

# Tests
Pour exécuter les tests, naviguez vers le dossier tests et exécutez les scripts de test.


# Informations Supplémentaires
Variables d'Environnement
Assurez-vous que les variables d'environnement associés à l'accès à la base de données existent (fichier .env au niveau du répértoire "backend").

# Configuration de la Base de Données
La base de données utilisée est MySQL. Les données nécessaires à l'accès à la base de données ont été fournies pour faciliter les choses.

# Documentation de l'API
vous pouvez consulter la documentation du backend via ce lien (generé avec swagger)
'http://127.0.0.1:8000/swagger/'
la documentation d'angular est generé avec Compodoc
executez la commande : 
compodoc -s
Naviguez vers
'http://127.0.0.1:8080/'

# Considérations de Sécurité
--> Mettez régulièrement à jour les dépendances pour éviter les vulnérabilités.
