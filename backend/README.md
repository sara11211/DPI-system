# Backend Setup for DPI System

Ce fichier explique comment configurer et démarrer l'environnement de développement pour la partie **backend** du projet DPI System.

## Prérequis

1. **Python 3.x** installé sur votre machine.  
   Vous pouvez télécharger Python à partir de [python.org](https://www.python.org/downloads/).

2. **MySQL** ou un autre gestionnaire de base de données compatible (si utilisé).

## Étapes pour configurer l'environnement


1. Cloner le dépôt : 
`git clone https://github.com/sara11211/DPI-system.git`
`cd DPI-system/backend`


 2. Créer et activer un environnement virtuel pour installer les dépendances: 

`python -m venv venv`
`venv\Scripts\activate`


3. Installer les dépendances  avec :  `pip install -r requirements.txt`.
4. Lancer le serveur Django pour tester le backend : `python manage.py runserver`

5. Désactiver l'environnement virtuel : 

Une fois que vous avez terminé, vous pouvez désactiver l'environnement virtuel en exécutant :
`deactivate`
