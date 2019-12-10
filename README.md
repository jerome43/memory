# memory

*Un jeu de memory où les temps sont enregistrés en BD mySql avec express.*

Vous devez au préalable créer la base de données mysql adéquate :

CREATE SCHEMA `memory` ;

CREATE TABLE `scores` (
  `idScore` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`idScore`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;