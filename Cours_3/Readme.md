## TP 2 : Apprentissage de MongoDB

Lancement du serveur : node .\Server.js

Dans ce TP il est question de reprendre le TP précédant, et de modifier l'existant avec une base de données MongoDB.

Il nous a été d'abord demandé de modifier nos requetes pour qu'elles utilisent la base MongoDB:

## Partie [GET]
## Affichage

![Image description](Captures/Get_cities_web_01.PNG)

## Contenus dans la base

![Image description](Captures/Get_cities_compas_02.PNG)

## Partie [POST]
## Ajout d'une ville

![Image description](Captures/Post_newCity_ok_03.PNG)

## Affichage (l'affiche retourne les données directes de la base)

![Image description](Captures/Get_cities_web_showPostOK_05.PNG)

## Name déjà utilisé

![Image description](Captures/Post_CityExist_Nok_04.PNG)

## Partie [PUT]
## Modification d'une ville

![Image description](Captures/Put_200_cityExist_06.PNG)

## Erreur si l'id n'est pas valide

![Image description](Captures/Put_400_idNotValid_06.PNG)

## Erreur si l'id n'existe pas

![Image description](Captures/Put_404_idNotExist_07.PNG)

## Partie [DELETE]
## Etat de la base avant suppréssion

![Image description](Captures/Delete_before_done_08.PNG)

## Etat de la base après suppréssion

![Image description](Captures/Delete_done_10.PNG)

## Requête de suppréssion

![Image description](Captures/Delete_request_done_09.PNG)

Maintenant il nous faut une interface servant à l'utilisateur pour réaliser les tâches.
Tout d'abord l'Ajout

## Partie [Ajout]
## Ajout du bouton ajout renvoyant vers /cityAjout

![Image description](Captures/Ajout_btn_ajoutVille.PNG)

## Affichage du form pour renseigner le nom

![Image description](Captures/cityAjout_front_11.PNG)

## Dans le cas d'une erreur, si le nom est déjà prit, une nouvelle page s'ouvre

![Image description](Captures/cityAjout_alreadyExist_12.PNG)

## Si le nom est valide :

![Image description](Captures/cityAjout_ok_13.PNG)

A présent, il nous faut modifier et supprimer un élément de notre table
J'ai ajouté deux nouvelles colonnes pour modifier ou supprimer
La modification ouvrira un modal contenant le nom en 'placeholder' à titre d'information

![Image description](Captures/modifications/front_table_btn_01.PNG)
On clique sur modifier
![Image description](Captures/modifications/clic_onModify_Nantes.PNG)
Si le nom est valide :
![Image description](Captures/modifications/Modify_ok.PNG)
Sinon :
![Image description](Captures/modifications/Name_already_use.PNG)

Le bouton ok aura pour effet de recharger la page pour la mettre à jour automatiquement
![Image description](Captures/modifications/reload_auto.PNG)

Pour la suppréssion on a le même principe, à la différence que cliquer implique directement l'action.
![Image description](Captures/suppression/beforeDelete.PNG)

![Image description](Captures/suppression/delete_ok.PNG)

![Image description](Captures/suppression/reload_auto.PNG)
