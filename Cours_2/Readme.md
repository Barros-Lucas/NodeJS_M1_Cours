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
