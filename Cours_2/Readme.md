## TP 2 : Apprentissage de Express

Lancement du serveur : node .\Server.js .\data.csv

Dans ce TP il est question de reprendre le TP précédant, et de modifier l'existant avec un serveur Express.
J'ai donc tout d'abord crée le lien vers / pour l'index, puis /datacsv pour accèder à l'ancien affichage

Il nous a été ensuite demandé de rajouter les quatres requetes HTTP dont voici les retours de rêquetes associées (utilisation de Postman):

## Partie [GET]
## [GET] -> Return file cities.json

![Image description](Captures_postman/GET_cities_03.PNG)

## [GET] -> Error files doesn't exist

![Image description](Captures_postman/GET_cities_404NotFound_04.PNG)

## Partie [POST]
## [POST] -> cities.json not exist and Add element

![Image description](Captures_postman/post_new_file__name_05.PNG)

## [POST] -> cities.json exist and Add element

![Image description](Captures_postman/post_new_name_ok_06.PNG)

## [POST] -> name already use

![Image description](Captures_postman/post_already_name_exist_07.PNG)

## Partie [PUT]
## [PUT] -> change name with existing id

![Image description](Captures_postman/put_200_changeName_08.PNG)

## [PUT] -> change name with none existing id

![Image description](Captures_postman/put_500_id_notExist_09.PNG)

## Partie [DELETE]
## [DELETE] -> delete entity with existing id

![Image description](Captures_postman/delete_idExist_10.PNG)

## [DELETE] -> delete entity with none existing id

![Image description](Captures_postman/delete_idNotExist_11.PNG)

## Partie Bonus

J'ai essayé d'ajouter une carte à l'adresse /citiesMap mais malheureusement je n'arrive pas à afficher le composant Map via express, même en passant par pug, ni même via un send file.
Le resultat attendu était:
![Image description](Captures_postman/MapFrance.PNG)

Cette page est générée par mon html : Cours_2\Map_test\JQueryMap\france\front\testMap.html
note que je n'ai pas ajouté au code git mes essaies, il s'agissait d'une copie de la request GET avec un corps vide faisant juste appelle à mon fichier html.
Résultat dans mon serveur :
![Image description](Captures_postman/MapFrance_notshow.PNG)
